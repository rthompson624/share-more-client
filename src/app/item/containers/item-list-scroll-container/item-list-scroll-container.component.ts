import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { User } from 'src/app/core/models/user.model';
import { RootStoreState, AuthenticationStoreSelectors, ItemStoreActions, ItemStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

const PAGE_SIZE = 8;

export class ItemsDataSource extends DataSource<Item | undefined> {
  private lastPageRequested: number = null;
  private dataStream = new BehaviorSubject<(Item | undefined)[]>(Array.from<Item>({ length: 0 }));
  private viewChangeSubscription = new Subscription();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
    super();
    this.store$.select(ItemStoreSelectors.selectAllItems).pipe(takeUntil(this.ngUnsubscribe)).subscribe(items => {
      this.dataStream.next(items);
    });
    this.store$.select(ItemStoreSelectors.selectItemPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(page => {
      if (page.skip === null) {
        this._fetchItemPage();
      } else {
        this.lastPageRequested = this._getPageForIndex(page.skip);
      }
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<(Item | undefined)[] | ReadonlyArray<Item | undefined>> {
    this.viewChangeSubscription.add(collectionViewer.viewChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(range => {
      const viewPage = this._getPageForIndex(range.end);
      if (viewPage > this.lastPageRequested) {
        this._fetchItemPage();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  private _fetchItemPage(): void {
    let nextPageToRequest: number;
    if (this.lastPageRequested === null) {
      nextPageToRequest = 0;
    } else {
      nextPageToRequest = this.lastPageRequested + 1;
    }
    this.store$.dispatch(ItemStoreActions.loadMany({ pageIndex: nextPageToRequest }));
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / PAGE_SIZE);
  }

}

@Component({
  selector: 'app-item-list-scroll-container',
  templateUrl: './item-list-scroll-container.component.html',
  styleUrls: ['./item-list-scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListScrollContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  dataSource: ItemsDataSource;
  user$: Observable<User>;
  CARD_HEIGHT = 361;
  @ViewChild(CdkVirtualScrollViewport, { static: false })
  scrollViewport: CdkVirtualScrollViewport;
  scrollPosition: number = null;
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.dataSource = new ItemsDataSource(this.store$);
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
    this.store$.select(ItemStoreSelectors.selectListScrollPosition).pipe(takeUntil(this.ngUnsubscribe)).subscribe(position => {
      this.scrollPosition = position;
    });
  }

  ngAfterViewInit() {
    // Need to wait a little before calling scroll action
    setTimeout(() => {
      if (this.scrollPosition) {
        this._scrollTo(this.scrollPosition);
      }
    }, 500);
  }

  ngOnDestroy() {
    this.store$.dispatch(ItemStoreActions.saveListScrollPosition({ listScrollPosition: this._getScrollPosition() }));
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }

  showDetails(item: Item): void {
    this.router.navigate([item._id], {relativeTo: this.route});
  }

  private _scrollTo(scrollPosition: number) {
    this.scrollViewport.scrollToOffset(scrollPosition);
  }

  private _getScrollPosition(): number {
    return this.scrollViewport.getOffsetToRenderedContentStart() + (this.CARD_HEIGHT * 1.5);
  }

}

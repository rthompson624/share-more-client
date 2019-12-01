import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit,
  OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { BehaviorSubject, Subscription, Observable, Subject } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { User } from 'src/app/core/models/user.model';
import { takeUntil } from 'rxjs/operators';
import { APP_CONSTANTS } from 'src/app/core/models/constants';
import { Page } from 'src/app/core/models/page.model';

export type LoadItemsCallback = ( pageIndex: number ) => void;

export class ItemsDataSource extends DataSource<Item | undefined> {
  private lastPageRequested: number = null;
  private dataStream = new BehaviorSubject<(Item | undefined)[]>(Array.from<Item>({ length: 0 }));
  private viewChangeSubscription = new Subscription();
  private ngUnsubscribe = new Subject<boolean>();

  constructor(
    private items$: Observable<Item[]>,
    private page$: Observable<Page>,
    private loadItems: LoadItemsCallback
  ) {
    super();
    this.items$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(items => this.dataStream.next(items));
    this.page$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(page => {
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
    this.loadItems(nextPageToRequest);
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / APP_CONSTANTS.ITEM_LIST_PAGE_SIZE);
  }

}

@Component({
  selector: 'app-item-list-scroll',
  templateUrl: './item-list-scroll.component.html',
  styleUrls: ['./item-list-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListScrollComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() user: User;
  @Input() scrollPosition: number;
  @Input() items$: Observable<Item[]>;
  @Input() page$: Observable<Page>;
  @Output() showDetail = new EventEmitter<Item>();
  @Output() saveScrollPosition = new EventEmitter<number>();
  @Output() loadItems = new EventEmitter<number>();
  @ViewChild(CdkVirtualScrollViewport, { static: false }) scrollViewport: CdkVirtualScrollViewport;
  dataSource: ItemsDataSource;
  ITEM_CARD_HEIGHT = APP_CONSTANTS.ITEM_CARD_HEIGHT;

  constructor(
  ) {
  }

  ngOnInit() {
    this.dataSource = new ItemsDataSource(this.items$, this.page$, (index => {
      this.loadItems.emit(index);
    }));
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
    this.saveScrollPosition.emit(this._getScrollPosition());
  }

  private _scrollTo(scrollPosition: number) {
    this.scrollViewport.scrollToOffset(scrollPosition);
  }

  private _getScrollPosition(): number {
    const offset = this.scrollViewport.getOffsetToRenderedContentStart();
    if (offset === 0) {
      return offset;
    } else {
      return offset + (APP_CONSTANTS.ITEM_CARD_HEIGHT * 0.5);
    }
  }

}

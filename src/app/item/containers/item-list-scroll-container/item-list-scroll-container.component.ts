import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { ItemService } from 'src/app/core/services/item.service';
import { User } from 'src/app/core/models/user.model';
import { RootStoreState, AuthenticationStoreSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';

export class ItemsDataSource extends DataSource<Item | undefined> {
  private cachedItems = Array.from<Item>({ length: 0 });
  private dataStream = new BehaviorSubject<(Item | undefined)[]>(this.cachedItems);
  private subscription = new Subscription();
  private pageSize = 8;
  private lastPage = 0;

  constructor(private itemService: ItemService) {
    super();
    // Start with some data.
    this._fetchItemPage();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Item | undefined)[] | ReadonlyArray<Item | undefined>> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      // Update the data
      const currentPage = this._getPageForIndex(range.end);
      if (currentPage > this.lastPage) {
        this.lastPage = currentPage;
        this._fetchItemPage();
      }
    }));
    return this.dataStream;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private _fetchItemPage(): void {
    // TODO: Add ownerId parameter...
    this.itemService.getMany(this.lastPage).subscribe(response => {
      this.cachedItems = this.cachedItems.concat(response.data);
      this.dataStream.next(this.cachedItems);
    });
  }

  private _getPageForIndex(i: number): number {
    return Math.floor(i / this.pageSize);
  }

}

@Component({
  selector: 'app-item-list-scroll-container',
  templateUrl: './item-list-scroll-container.component.html',
  styleUrls: ['./item-list-scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListScrollContainerComponent implements OnInit {
  dataSource: ItemsDataSource;
  user$: Observable<User>;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.dataSource = new ItemsDataSource(this.itemService);
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
  }

  showDetails(item: Item): void {
    this.router.navigate([item._id], {relativeTo: this.route});
  }

}

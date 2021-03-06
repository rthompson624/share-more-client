import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';

import { Item } from 'src/app/core/models/item.model';
import { RootStoreState, ItemStoreActions, ItemStoreSelectors } from '../../../root-store';
import { Page } from 'src/app/core/models/page.model';

@Component({
  selector: 'app-item-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-list-container.component.html',
  styleUrls: ['./item-list-container.component.css']
})
export class ItemListContainerComponent implements OnInit {
  columns: string[] = ['name'];
  items$: Observable<Item[]>;
  page$: Observable<Page>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.items$ = this.store$.select(ItemStoreSelectors.selectAllItems);
    this.page$ = this.store$.select(ItemStoreSelectors.selectItemPage);
    this.loadItems(null); // Null signifies use page in store
  }

  selectItem(item: Item): void {
    this.router.navigate([item._id], {relativeTo: this.route});
  }

  createNew(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  onLoad(event: PageEvent) {
    this.loadItems(event.pageIndex);
  }

  private loadItems(pageIndex: number): void {
    this.store$.dispatch(ItemStoreActions.loadMany({ pageIndex: pageIndex }));
  }

}

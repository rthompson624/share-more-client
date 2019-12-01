import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { User } from 'src/app/core/models/user.model';
import { RootStoreState, AuthenticationStoreSelectors, ItemStoreSelectors, ItemStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/core/models/page.model';

@Component({
  selector: 'app-item-list-scroll-container',
  templateUrl: './item-list-scroll-container.component.html',
  styleUrls: ['./item-list-scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListScrollContainerComponent implements OnInit {
  user$: Observable<User>;
  scrollPosition$: Observable<number>;
  items$: Observable<Item[]>;
  page$: Observable<Page>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.user$ = this.store$.select(AuthenticationStoreSelectors.selectUser);
    this.items$ = this.store$.select(ItemStoreSelectors.selectAllItems);
    this.page$ = this.store$.select(ItemStoreSelectors.selectItemPage);
    this.scrollPosition$ = this.store$.select(ItemStoreSelectors.selectListScrollPosition);
  }

  showDetail(item: Item): void {
    this.router.navigate([item._id], {relativeTo: this.route});
  }

  createNew(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  saveScrollPosition(scrollPosition: number): void {
    this.store$.dispatch(ItemStoreActions.saveListScrollPosition({ listScrollPosition: scrollPosition }));
  }

  loadItems(pageIndex: number): void {
    this.store$.dispatch(ItemStoreActions.loadMany({ pageIndex: pageIndex }));
  }

}

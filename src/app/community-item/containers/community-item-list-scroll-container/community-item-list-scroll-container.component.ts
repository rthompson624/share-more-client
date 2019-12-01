import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from 'src/app/core/models/item.model';
import { User } from 'src/app/core/models/user.model';
import { RootStoreState, AuthenticationStoreSelectors, CommunityItemStoreSelectors, CommunityItemStoreActions } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/core/models/page.model';

@Component({
  selector: 'app-community-item-list-scroll-container',
  templateUrl: './community-item-list-scroll-container.component.html',
  styleUrls: ['./community-item-list-scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityItemListScrollContainerComponent implements OnInit {
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
    this.items$ = this.store$.select(CommunityItemStoreSelectors.selectAllItems);
    this.page$ = this.store$.select(CommunityItemStoreSelectors.selectItemPage);
    this.scrollPosition$ = this.store$.select(CommunityItemStoreSelectors.selectListScrollPosition);
  }

  showDetail(item: Item): void {
    this.router.navigate([item._id], {relativeTo: this.route});
  }

  createNew(): void {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  saveScrollPosition(scrollPosition: number): void {
    this.store$.dispatch(CommunityItemStoreActions.saveListScrollPosition({ listScrollPosition: scrollPosition }));
  }

  loadItems(pageIndex: number): void {
    this.store$.dispatch(CommunityItemStoreActions.loadMany({ pageIndex: pageIndex }));
  }

}

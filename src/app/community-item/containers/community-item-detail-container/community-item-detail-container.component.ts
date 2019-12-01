import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Item } from 'src/app/core/models/item.model';
import { RootStoreState, CommunityItemStoreActions, CommunityItemStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-community-item-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './community-item-detail-container.component.html',
  styleUrls: ['./community-item-detail-container.component.css']
})
export class CommunityItemDetailContainerComponent implements OnInit {
  item$: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(CommunityItemStoreActions.loadOne({ id: paramMap.get('id')}));
        return this.store$.select(CommunityItemStoreSelectors.selectItemById(paramMap.get('id')));
      })
    );
  }

  navigateToList(): void {
    this.router.navigate(['/', 'community-items']);
  }

}

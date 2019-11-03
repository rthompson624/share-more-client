import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Item } from '../../../core/models/item.model';
import { RootStoreState, ItemStoreActions, ItemStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-item-detail-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-detail-container.component.html',
  styleUrls: ['./item-detail-container.component.css']
})
export class ItemDetailContainerComponent implements OnInit {
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
        this.store$.dispatch(ItemStoreActions.loadOne({ id: paramMap.get('id')}));
        return this.store$.select(ItemStoreSelectors.selectItemById(paramMap.get('id')));
      })
    );
  }

  editItem(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteItem(item: Item): void {
    this.store$.dispatch(ItemStoreActions.deleteOne({ item: item }));
  }

}

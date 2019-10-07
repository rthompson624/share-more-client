import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Item } from '../../../core/models/item.model';
import { RootStoreState, ItemStoreActions, ItemStoreSelectors } from '../../../root-store';

@Component({
  selector: 'app-item-edit-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-edit-container.component.html',
  styleUrls: ['./item-edit-container.component.css']
})
export class ItemEditContainerComponent implements OnInit {
  item$: Observable<Item>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
    this.item$ = this.route.paramMap.pipe(
      switchMap(paramMap => {
        this.store$.dispatch(new ItemStoreActions.LoadOneAction({ id: paramMap.get('id')}));
        return this.store$.select(ItemStoreSelectors.selectItemById(paramMap.get('id')));
      })
    );
  }

  onSave(item: Item): void {
    this.store$.dispatch(new ItemStoreActions.UpdateAction(item));
  }

}

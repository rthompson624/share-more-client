import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Item } from '../../../core/models/item.model';
import { RootStoreState, ItemStoreActions } from '../../../root-store';

@Component({
  selector: 'app-item-create-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './item-create-container.component.html',
  styleUrls: ['./item-create-container.component.css']
})
export class ItemCreateContainerComponent implements OnInit {
  item: Item = {
    name: null,
    ownerId: null
  };

  constructor(
    private store$: Store<RootStoreState.State>
  ) {
  }

  ngOnInit() {
  }

  onSave(item: Item): void {
    this.store$.dispatch(ItemStoreActions.createOne({ item: item }));
  }

}

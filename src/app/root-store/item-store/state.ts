import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Item } from 'src/app/core/models/item.model';
import { Page } from 'src/app/core/models/page.model';

export const featureAdapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: model => model._id,
  sortComparer: (item1: Item, item2: Item): number => {
    return item1.name.localeCompare(item2.name);
  }
});

export interface State extends EntityState<Item> {
  page?: Page;
  isLoading?: boolean;
  error?: any;
  selectedItem?: Item;
}

export const initialState: State = featureAdapter.getInitialState({
  page: {
    total: null,
    limit: null,
    skip: 0
  },
  isLoading: false,
  error: null,
  selectedItem: null
});

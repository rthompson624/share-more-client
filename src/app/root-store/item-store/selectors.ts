import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Item } from '../../core/models/item.model';
import { featureAdapter, State } from './state';
import { Page } from '../../core/models/page.model';

export const getPage = (state: State): Page => state.page;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getSelectedItem = (state: State): Item => state.selectedItem;

// Parameter (case-sensitive) in createFeatureSelector() must match parameter in StoreModule.forFeature() call in xxxxx-store.module.ts
export const selectItemState: MemoizedSelector<object, State> = createFeatureSelector<State>('item');

export const selectAllItems: (state: object) => Item[] = featureAdapter.getSelectors(selectItemState).selectAll;

export const selectItemById = (id: string) => createSelector(selectAllItems, (items: Item[]) => {
  if (items) {
    return items.find(item => item._id === id);
  } else {
    return null;
  }
});

export const selectItemPage: MemoizedSelector<object, Page> = createSelector(selectItemState, getPage);
export const selectItemError: MemoizedSelector<object, any> = createSelector(selectItemState, getError);
export const selectItemIsLoading: MemoizedSelector<object, boolean> = createSelector(selectItemState, getIsLoading);
export const selectItemSelected: MemoizedSelector<object, Item> = createSelector(selectItemState, getSelectedItem);

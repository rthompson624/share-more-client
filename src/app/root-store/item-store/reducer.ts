import { createReducer, on } from '@ngrx/store';
import { featureAdapter, initialState } from './state';
import * as ItemStoreActions from './actions';

export const itemReducer = createReducer(
  initialState,
  on(
    ItemStoreActions.loadMany,
    ItemStoreActions.loadOne,
    ItemStoreActions.deleteOne,
    ItemStoreActions.updateOne,
    ItemStoreActions.createOne,
    (state) => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),
  on(ItemStoreActions.failureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ItemStoreActions.selectOne, (state, { item }) => ({
    ...state,
    selectedItem: item
  })),
  on(ItemStoreActions.loadManySuccess, (state, { page }) => featureAdapter.addMany(page.data, {
    ...state,
    page: {
      total: page.total,
      limit: page.limit,
      skip: page.skip
    },
    isLoading: false,
    error: null
  })),
  on(ItemStoreActions.loadOneSuccess,
    ItemStoreActions.createOneSuccess,
    (state, { item }) => featureAdapter.addOne(item, {
      ...state,
      isLoading: false,
      error: null
    })
  ),
  on(ItemStoreActions.deleteOneSuccess, (state, { item }) => featureAdapter.removeOne(item._id, {
    ...state,
    isLoading: false,
    error: null
  })),
  on(ItemStoreActions.updateOneSuccess, (state, { item }) => featureAdapter.updateOne({ id: item._id, changes: item }, {
    ...state,
    isLoading: false,
    error: null
  })),
  on(ItemStoreActions.saveListScrollPosition, (state, { listScrollPosition }) => ({
    ...state,
    listScrollPosition: listScrollPosition
  }))
);

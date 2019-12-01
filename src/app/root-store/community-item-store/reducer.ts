import { createReducer, on } from '@ngrx/store';
import { featureAdapter, initialState } from './state';
import * as CommunityItemStoreActions from './actions';
import { CommunityItemStoreModule } from './community-item-store.module';

export const communityItemReducer = createReducer(
  initialState,
  on(
    CommunityItemStoreActions.loadMany,
    CommunityItemStoreActions.loadOne,
    (state) => ({
      ...state,
      isLoading: true,
      error: null
    })
  ),
  on(CommunityItemStoreActions.failureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(CommunityItemStoreActions.loadManySuccess, (state, { page }) => featureAdapter.addMany(page.data, {
    ...state,
    page: {
      total: page.total,
      limit: page.limit,
      skip: page.skip
    },
    isLoading: false,
    error: null
  })),
  on(CommunityItemStoreActions.loadOneSuccess,
    (state, { item }) => featureAdapter.addOne(item, {
      ...state,
      isLoading: false,
      error: null
    })
  ),
  on(CommunityItemStoreActions.saveListScrollPosition, (state, { listScrollPosition }) => ({
    ...state,
    listScrollPosition: listScrollPosition
  }))
);

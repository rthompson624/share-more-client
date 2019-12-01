import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ItemStoreSelectors } from './item-store';
import { CommunityItemStoreSelectors } from './community-item-store';
import { AuthenticationStoreSelectors } from './authentication-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  ItemStoreSelectors.selectItemError,
  CommunityItemStoreSelectors.selectItemError,
  AuthenticationStoreSelectors.selectError,
  (item: string, communityItem: string, authentication: string) => {
    return item || communityItem || authentication;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  ItemStoreSelectors.selectItemIsLoading,
  CommunityItemStoreSelectors.selectItemIsLoading,
  AuthenticationStoreSelectors.selectIsLoading,
  (item: boolean, communityItem: boolean, authentication: boolean) => {
    return item || communityItem || authentication;
  }
);

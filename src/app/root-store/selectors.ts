import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ItemStoreSelectors } from './item-store';
import { AuthenticationStoreSelectors } from './authentication-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  ItemStoreSelectors.selectItemError,
  AuthenticationStoreSelectors.selectError,
  (item: string, authentication: string) => {
    return item || authentication;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  ItemStoreSelectors.selectItemIsLoading,
  AuthenticationStoreSelectors.selectIsLoading,
  (item: boolean, authentication: boolean) => {
    return item || authentication;
  }
);

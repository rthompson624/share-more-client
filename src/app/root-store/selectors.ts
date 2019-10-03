import { createSelector, MemoizedSelector } from '@ngrx/store';
import { TripStoreSelectors } from './trip-store';
import { AuthenticationStoreSelectors } from './authentication-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  TripStoreSelectors.selectTripError,
  AuthenticationStoreSelectors.selectError,
  (trip: string, authentication: string) => {
    return trip || authentication;
  }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  TripStoreSelectors.selectTripIsLoading,
  AuthenticationStoreSelectors.selectIsLoading,
  (trip: boolean, authentication: boolean) => {
    return trip || authentication;
  }
);

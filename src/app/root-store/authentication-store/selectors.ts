import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { State } from './state';

const getError = (state: State): string => state.error;
const getIsLoading = (state: State): boolean => state.isLoading;
const getUser = (state: State): User => <User>JSON.parse(JSON.stringify(state.user));
const getAccessToken = (state: State): string => state.accessToken;

// Parameter (case-sensitive) in createFeatureSelector() must match parameter in StoreModule.forFeature() call in xxxxx-store.module.ts
export const selectState: MemoizedSelector<object, State> = createFeatureSelector<State>('authentication');

export const selectError: MemoizedSelector<object, string> = createSelector(
  selectState,
  getError
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
  selectState,
  getIsLoading
);

export const selectUser: MemoizedSelector<object, User> = createSelector(
  selectState,
  getUser
);

export const selectAccessToken: MemoizedSelector<object, string> = createSelector(
  selectState,
  getAccessToken
);
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TripLog } from '../../core/models/trip-log.model';
import { featureAdapter, State } from './state';
import { Page } from '../../core/models/page.model';

export const getPage = (state: State): Page => state.page;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getSelected = (state: State): TripLog => state.selected;

// Parameter (case-sensitive) in createFeatureSelector() must match parameter in StoreModule.forFeature() call in xxxxx-store.module.ts
export const selectTripLogState: MemoizedSelector<object, State> = createFeatureSelector<State>('triplog');

export const selectAllTripLogItems: (state: object) => TripLog[] = featureAdapter.getSelectors(selectTripLogState).selectAll;

export const selectTripLogById = (id: number) =>
  createSelector(selectAllTripLogItems, (allTripLogs: TripLog[]) => {
    if (allTripLogs) {
      return allTripLogs.find(item => item.id === id);
    } else {
      return null;
    }
  });

export const selectTripLogPage: MemoizedSelector<object, Page> = createSelector(selectTripLogState, getPage);
export const selectTripLogError: MemoizedSelector<object, any> = createSelector(selectTripLogState, getError);
export const selectTripLogIsLoading: MemoizedSelector<object, boolean> = createSelector(selectTripLogState, getIsLoading);
export const selectTripLogSelected: MemoizedSelector<object, TripLog> = createSelector(selectTripLogState, getSelected);

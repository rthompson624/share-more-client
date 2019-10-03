import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Trip } from '../../core/models/trip.model';
import { featureAdapter, State } from './state';
import { Page } from '../../core/models/page.model';

export const getPage = (state: State): Page => state.page;
export const getError = (state: State): any => state.error;
export const getIsLoading = (state: State): boolean => state.isLoading;
export const getSelectedTrip = (state: State): Trip => state.selectedTrip;

// Parameter (case-sensitive) in createFeatureSelector() must match parameter in StoreModule.forFeature() call in xxxxx-store.module.ts
export const selectTripState: MemoizedSelector<object, State> = createFeatureSelector<State>('trip');

export const selectAllTripItems: (state: object) => Trip[] = featureAdapter.getSelectors(selectTripState).selectAll;

export const selectTripById = (id: number) =>
  createSelector(selectAllTripItems, (allTrips: Trip[]) => {
    if (allTrips) {
      return allTrips.find(item => item.id === id);
    } else {
      return null;
    }
  });

export const selectTripPage: MemoizedSelector<object, Page> = createSelector(selectTripState, getPage);
export const selectTripError: MemoizedSelector<object, any> = createSelector(selectTripState, getError);
export const selectTripIsLoading: MemoizedSelector<object, boolean> = createSelector(selectTripState, getIsLoading);
export const selectTripSelected: MemoizedSelector<object, Trip> = createSelector(selectTripState, getSelectedTrip);

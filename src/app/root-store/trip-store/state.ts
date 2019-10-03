import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Trip } from '../../core/models/trip.model';
import { Page } from '../../core/models/page.model';
import * as moment from 'moment';

export const featureAdapter: EntityAdapter<Trip> = createEntityAdapter<Trip>({
  selectId: model => model.id,
  sortComparer: (trip1: Trip, trip2: Trip): number => {
    // Reverse chronological order
    const trip1Start = moment(trip1.startDate);
    const trip2Start = moment(trip2.startDate);
    return trip2Start.diff(trip1Start);
  }
});

export interface State extends EntityState<Trip> {
  page?: Page;
  isLoading?: boolean;
  error?: any;
  selectedTrip?: Trip;
}

export const initialState: State = featureAdapter.getInitialState({
  page: {
    total: null,
    limit: null,
    skip: 0
  },
  isLoading: false,
  error: null,
  selectedTrip: null
});

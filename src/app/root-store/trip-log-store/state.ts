import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TripLog } from '../../core/models/trip-log.model';
import { Page } from '../../core/models/page.model';
import * as moment from 'moment';

export const featureAdapter: EntityAdapter<TripLog> = createEntityAdapter<TripLog>({
  selectId: model => model.id,
  sortComparer: (log1: TripLog, log2: TripLog): number => {
    // Reverse chronological order
    const log1Start = moment(log1.logDate);
    const log2Start = moment(log2.logDate);
    return log2Start.diff(log1Start);
  }
});

export interface State extends EntityState<TripLog> {
  page?: Page;
  isLoading?: boolean;
  error?: any;
  selected?: TripLog;
}

export const initialState: State = featureAdapter.getInitialState({
  page: {
    total: null,
    limit: null,
    skip: 0
  },
  isLoading: false,
  error: null,
  selected: null
});

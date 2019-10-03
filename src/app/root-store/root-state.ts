import { TripStoreState } from './trip-store';
import { TripLogStoreState } from './trip-log-store';
import { AuthenticationStoreState } from './authentication-store';

export interface State {
  trip: TripStoreState.State;
  triplog: TripLogStoreState.State;
  authentication: AuthenticationStoreState.State;
}

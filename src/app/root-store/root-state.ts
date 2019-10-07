import { ItemStoreState } from './item-store';
import { AuthenticationStoreState } from './authentication-store';

export interface State {
  item: ItemStoreState.State;
  authentication: AuthenticationStoreState.State;
}

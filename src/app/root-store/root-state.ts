import { ItemStoreState } from './item-store';
import { AuthenticationStoreState } from './authentication-store';
import { CommunityItemStoreState } from './community-item-store';

export interface State {
  item: ItemStoreState.State;
  communityItem: CommunityItemStoreState.State;
  authentication: AuthenticationStoreState.State;
}

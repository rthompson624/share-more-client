import { User } from '../../core/models/user.model';

export interface State {
  user: User | null;
  accessToken: string;
  isLoading: boolean;
  error: string;
}

export const initialState: State = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null
}
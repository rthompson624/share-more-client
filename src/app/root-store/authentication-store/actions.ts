import { createAction, props } from '@ngrx/store';
import { AuthResponse } from 'src/app/core/models/auth-response.model';
import { AuthRequest } from 'src/app/core/models/auth-request.model';
import { User } from 'src/app/core/models/user.model';

export const createAccount = createAction(
  '[Authentication] Create account',
  props<{ user: User }>()
);

export const createAccountSuccess = createAction(
  '[Authentication] Create account (success)',
  props<{ user: User }>()
);

export const createAccountFailure = createAction(
  '[Authentication] Create account (failure)',
  props<{ error: string }>()
);

export const login = createAction(
  '[Authentication] Login',
  props<{ auth: AuthRequest }>()
);

export const loginSuccess = createAction(
  '[Authentication] Login (success)',
  props<{ auth: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Authentication] Login (failure)',
  props<{ error: string }>()
);

export const logout = createAction(
  '[Authentication] Logout'
);

export const restoreAuthenticationState = createAction(
  '[Authentication] Restore authentication state'
);

export const restoreAuthenticationStateSuccess = createAction(
  '[Authentication] Restore authentication state (success)',
  props<{ user: User; accessToken: string }>()
);

export const restoreAuthenticationStateFailure = createAction(
  '[Authentication] Restore authentication state (failure)'
);

export const tokenValidationSuccess = createAction(
  '[Authentication] Token validation (success)'
);

export const tokenValidationFailure = createAction(
  '[Authentication] Token validation (failure)'
);

export const updateUser = createAction(
  '[Authentication] Update user',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Authentication] Update user (success)',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[Authentication] Update user (failure)',
  props<{ error: string }>()
);

export const loadUserInfo = createAction(
  '[Authentication] Load user info',
  props<{ auth: AuthResponse }>()
);

export const loadUserInfoSuccess = createAction(
  '[Authentication] Load user info (success)',
  props<{ user: User }>()
);

export const loadUserInfoFailure = createAction(
  '[Authentication] Load user info (failure)',
  props<{ error: string }>()
);

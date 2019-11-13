import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as AuthenticationStoreActions from './actions';

export const authenticationReducer = createReducer(
  initialState,
  on(
    AuthenticationStoreActions.createAccount,
    AuthenticationStoreActions.login,
    AuthenticationStoreActions.restoreAuthenticationState,
    AuthenticationStoreActions.updateUser,
    AuthenticationStoreActions.loadUserInfo,
    (state) => ({
      ...state,
      error: null,
      isLoading: true
    })
  ),
  on(
    AuthenticationStoreActions.createAccountFailure,
    AuthenticationStoreActions.loginFailure,
    AuthenticationStoreActions.updateUserFailure,
    AuthenticationStoreActions.loadUserInfoFailure,
    (state, { error }) => ({
      ...state,
      error: error,
      isLoading: false
    })
  ),
  on(
    AuthenticationStoreActions.createAccountSuccess,
    AuthenticationStoreActions.tokenValidationSuccess,
    (state) => ({
      ...state,
      error: null,
      isLoading: false
    })
  ),
  on(
    AuthenticationStoreActions.loginSuccess,
    (state, { auth }) => ({
      ...state,
      user: { _id: auth.user_id },
      accessToken: auth.access_token,
      error: null,
      isLoading: false
    })
  ),
  on(
    AuthenticationStoreActions.restoreAuthenticationStateFailure,
    AuthenticationStoreActions.logout,
    (state) => ({
      ...state,
      user: null,
      accessToken: null,
      error: null,
      isLoading: false
    })
  ),
  on(
    AuthenticationStoreActions.restoreAuthenticationStateSuccess,
    (state, { user, accessToken }) => ({
      ...state,
      user: user,
      accessToken: accessToken,
      error: null,
      isLoading: false
    })
  ),
  on(
    AuthenticationStoreActions.tokenValidationFailure,
    (state) => ({
      ...state,
      accessToken: null
    })
  ),
  on(
    AuthenticationStoreActions.updateUserSuccess,
    AuthenticationStoreActions.loadUserInfoSuccess,
    (state, { user }) => ({
      ...state,
      user: user,
      error: null,
      isLoading: false
    })
  )
);

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from '../../core/services/authentication.service';
import { AuthRequest } from '../../core/models/auth-request.model';
import { AuthResponse } from '../../core/models/auth-response.model';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import * as featureActions from './actions';
import { RootStoreState } from '../../root-store';

@Injectable()
export class AuthenticationStoreEffects {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  @Effect()
  createAccountRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreateAccountRequestAction>(
      featureActions.ActionTypes.CREATE_ACCOUNT_REQUEST
    ),
    switchMap(action => {
      const user: User = {
        email: action.payload.email,
        password: action.payload.password
      };
      return this.userService.create(user).pipe(
        map(user => new featureActions.CreateAccountSuccessAction(user)),
        catchError(error => {
          return observableOf(new featureActions.CreateAccountFailureAction({ error: this.formatError(error) }));
        })
	    );
    })
  );

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoginRequestAction>(
      featureActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action => {
      const authReq: AuthRequest = {
        username: action.payload.email,
        password: action.payload.password
      };
      return this.authService.authenticateUser(authReq).pipe(
        map(authRes => new featureActions.LoginSuccessAction(authRes)),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Unknown error occurred during authentication';
          if (error.status === 401 && error.statusText === 'Unauthorized') errorMessage = 'Login credentials not recognized'
          return observableOf(new featureActions.LoginFailureAction({ error: errorMessage }));
        })
	    );
    })
  );

  @Effect()
  loginSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoginSuccessAction>(
      featureActions.ActionTypes.LOGIN_SUCCESS
    ),
    switchMap(action => {
      return this.router.navigate(['/'])
      .then(() => new featureActions.LoadUserInfoRequestAction(action.payload))
      .catch(error => new featureActions.FailureAction({ error: this.formatError(error) }));
    })
  );

  @Effect()
  loadUserInfoRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadUserInfoRequestAction>(
      featureActions.ActionTypes.LOAD_USER_INFO_REQUEST
    ),
    switchMap(action => 
      this.userService.getOne(action.payload.user_id).pipe(
        tap(user => this.authService.updateUserInLocalStorage(user)),
        map(user => new featureActions.LoadUserInfoSuccessAction(user)),
        catchError(error => {
          return observableOf(new featureActions.LoadUserInfoFailureAction({ error: this.formatError(error) }));
        })
      )
    )
  );

  @Effect()
  logoutRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LogoutRequestAction>(
      featureActions.ActionTypes.LOGOUT_REQUEST
    ),
    switchMap(() => {
      return this.router.navigate(['/', 'authentication', 'login'])
      .then(() => {
        this.authService.logoutUser();
        return new featureActions.LogoutSuccessAction();
      })
      .catch(error => new featureActions.FailureAction({ error: this.formatError(error) }));
    })
  );

  @Effect()
  restoreAuthenticationStateRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.RestoreAuthenticationStateRequestAction>(
      featureActions.ActionTypes.RESTORE_AUTHENTICATION_STATE_REQUEST
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) => {
      // Check store before reloading from authService
      let user: User;
      let accessToken: string;
      if (store.authentication.user && store.authentication.accessToken) {
        user = store.authentication.user;
        accessToken = store.authentication.accessToken;
      } else {
        if (this.authService.userIsAuthenticated()) {
          user = this.authService.getUser();
          accessToken = this.authService.getAccessToken();
        } else {
          throw 'user not authenticated';
        }
      }
      return observableOf(new featureActions.RestoreAuthenticationStateSuccessAction({ user: user, accessToken: accessToken }));
    }),
    catchError(() => observableOf(new featureActions.RestoreAuthenticationStateFailureAction()))
  );

  @Effect()
  restoreAuthenticationStateSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.RestoreAuthenticationStateSuccessAction>(
      featureActions.ActionTypes.RESTORE_AUTHENTICATION_STATE_SUCCESS
    ),
    switchMap(action => 
      // Verify token is still valid by attempting an API call
      this.userService.getOne(action.payload.user._id).pipe(
        map(() => new featureActions.TokenValidationSuccessAction()),
        catchError(() => {
          this.authService.logoutUser();
          return observableOf(new featureActions.TokenValidationFailureAction());
        })
      )
    )
  );

  @Effect()
  restoreAuthenticationStateFailureEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.RestoreAuthenticationStateFailureAction>(
      featureActions.ActionTypes.RESTORE_AUTHENTICATION_STATE_FAILURE
    ),
    switchMap(() => {
      return this.router.navigate(['/', 'authentication', 'login'])
      .then(() => new featureActions.RouteNavigationAction())
      .catch(error => new featureActions.FailureAction({ error: this.formatError(error) }));
    })
  );

  @Effect()
  tokenValidationFailureEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.TokenValidationFailureAction>(
      featureActions.ActionTypes.TOKEN_VALIDATION_FAILURE
    ),
    switchMap(() => {
      return this.router.navigate(['/', 'authentication', 'login'])
      .then(() => new featureActions.RouteNavigationAction())
      .catch(error => new featureActions.FailureAction({ error: this.formatError(error) }));
    })
  );

  @Effect()
  updateUserEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.UpdateUserRequestAction>(
      featureActions.ActionTypes.UPDATE_USER_REQUEST
    ),
    switchMap(action =>
      this.userService.update(action.payload).pipe(
        map(response => {
          this.authService.updateUserInLocalStorage(response);
          return new featureActions.UpdateUserSuccessAction(response);
        }),
        catchError(error =>
          observableOf(new featureActions.UpdateUserFailureAction({ error: this.formatError(error) }))
        )
      )
    )
  );

  private formatError(error: any): string {
    if (error.error && error.error.errors && error.error.errors.length) {
      switch (error.error.errors[0].message) {
        case 'email_UNIQUE must be unique':
          return 'An account for this email already exists.';
        default:
          return error.error.errors[0].message;
      }
    }
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error) return error.error.toString();
    if (error) return error.toString();
  }

}
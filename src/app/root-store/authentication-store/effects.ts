import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthenticationService } from '../../core/services/authentication.service';
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

  createAccount$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.createAccount),
    switchMap(action => {
      return this.userService.create(action.user).pipe(
        map(user => featureActions.createAccountSuccess({ user: user })),
        catchError(error => {
          return of(featureActions.createAccountFailure({ error: this.formatError(error) }));
        })
      );
    })
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.login),
    switchMap(action => {
      return this.authService.authenticateUser(action.auth).pipe(
        map(authRes => featureActions.loginSuccess({auth: authRes})),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'Unknown error occurred during authentication';
          if (error.status === 401 && error.statusText === 'Unauthorized') {
            errorMessage = 'Login credentials not recognized';
          }
          return of(featureActions.loginFailure({ error: errorMessage }));
        })
      );
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loginSuccess),
    switchMap(action => {
      return this.router.navigate(['/'])
      .then(() => featureActions.loadUserInfo({ auth: action.auth }));
    })
  ));

  loadUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadUserInfo),
    switchMap(action =>
      this.userService.getOne(action.auth.user_id).pipe(
        tap(user => this.authService.updateUserInLocalStorage(user)),
        map(user => featureActions.loadUserInfoSuccess({ user: user })),
        catchError(error => {
          return of(featureActions.loadUserInfoFailure({ error: this.formatError(error) }));
        })
      )
    )
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.logout),
    tap(() => {
      this.authService.logoutUser();
      this.router.navigate(['/', 'authentication', 'login']);
    })
  ), { dispatch: false });

  restoreAuthenticationState$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.restoreAuthenticationState),
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
          throw Error('user not authenticated');
        }
      }
      return of(featureActions.restoreAuthenticationStateSuccess({ user: user, accessToken: accessToken }));
    }),
    catchError(() => of(featureActions.restoreAuthenticationStateFailure()))
  ));

  restoreAuthenticationStateSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.restoreAuthenticationStateSuccess),
    switchMap(action =>
      // Verify token is still valid by attempting an API call
      this.userService.getOne(action.user._id).pipe(
        map(() => featureActions.tokenValidationSuccess()),
        catchError(() => {
          this.authService.logoutUser();
          return of(featureActions.tokenValidationFailure());
        })
      )
    )
  ));

  restoreAuthenticationStateFailure$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.restoreAuthenticationStateFailure),
    tap(() => {
      this.router.navigate(['/', 'authentication', 'login']);
    })
  ), { dispatch: false });

  tokenValidationFailure$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.tokenValidationFailure),
    tap(() => {
      this.router.navigate(['/', 'authentication', 'login']);
    })
  ), { dispatch: false });

  updateUserEffect$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.updateUser),
    switchMap(action =>
      this.userService.update(action.user).pipe(
        map(user => {
          this.authService.updateUserInLocalStorage(user);
          return featureActions.updateUserSuccess({ user: user });
        }),
        catchError(error =>
          of(featureActions.updateUserFailure({ error: this.formatError(error) }))
        )
      )
    )
  ));

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
    if (error.error) {
      return error.error.toString();
    }
    if (error) {
      return error.toString();
    }
  }

}

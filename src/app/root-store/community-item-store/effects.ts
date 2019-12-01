import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ItemService } from 'src/app/core/services/item.service';
import * as featureActions from './actions';
import { RootStoreState } from '../';

@Injectable()
export class CommunityItemStoreEffects {
  constructor(
    private router: Router,
    private dataService: ItemService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

  loadOne$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadOne),
    switchMap(action =>
      this.dataService.getOne(action.id).pipe(
        map(item =>
          featureActions.loadOneSuccess({ item: item })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      )
    )
  ));

  loadMany$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.loadMany),
    withLatestFrom(this.store$),
    switchMap(([action, store]) => {
      let pageIndex = action.pageIndex;
      // If page index is null use what the store has
      if (pageIndex === null) {
        if (store.item.page.skip) {
          pageIndex = store.item.page.skip / store.item.page.limit;
        } else {
          pageIndex = 0;
        }
      }
      return this.dataService.getMany(pageIndex, store.authentication.user._id, 'community').pipe(
        map(page =>
          featureActions.loadManySuccess({ page: page })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      );
    })
  ));

  failureEffect$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.failureAction),
    tap(action => {
      switch (action.error) {
        case 'jwt expired':
          this.router.navigate(['/', 'authentication', 'login']);
          break;
        default:
      }
    })
  ));

  private formatError(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    if (error.error) {
      return error.error.toString();
    }
    if (error) {
      return error.toString();
    }
    return null;
  }

}

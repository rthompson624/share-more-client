import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ItemService } from '../../core/services/item.service';
import * as featureActions from './actions';
import { RootStoreState } from '..';

@Injectable()
export class ItemStoreEffects {
  constructor(
    private router: Router,
    private dataService: ItemService,
    private actions$: Actions,
    private store$: Store<RootStoreState.State>
  ) {}

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
      return this.dataService.getMany(pageIndex, store.authentication.user._id).pipe(
        map(page =>
          featureActions.loadManySuccess({ page: page })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      );
    })
  ));

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

  deleteOne$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.deleteOne),
    switchMap(action =>
      this.dataService.delete(action.item).pipe(
        map(() =>
          featureActions.deleteOneSuccess({ item: action.item })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      )
    )
  ));

  deleteOneSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.deleteOneSuccess),
    tap(() => this.router.navigate(['/items']))
  ), { dispatch: false });

  updateOne$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.updateOne),
    switchMap(action =>
      this.dataService.update(action.item).pipe(
        map(item =>
          featureActions.updateOneSuccess({ item: item })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      )
    )
  ));

  updateOneSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.updateOneSuccess),
    tap(action => this.router.navigate(['/items', action.item._id]))
  ), { dispatch: false });

  createOne$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.createOne),
    withLatestFrom(this.store$),
    switchMap(([action, store])  => {
      action.item.ownerId = store.authentication.user._id;
      return this.dataService.create(action.item).pipe(
        map(item =>
          featureActions.createOneSuccess({ item: item })
        ),
        catchError(error =>
          of(featureActions.failureAction({ error: this.formatError(error) }))
        )
      );
    })
  ));

  createOneSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(featureActions.createOneSuccess),
    tap(action => this.router.navigate(['/items', action.item._id]))
  ), { dispatch: false });

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

import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.model';
import { ApiPage } from 'src/app/core/models/api-page.model';

export const loadOne = createAction(
  '[Community-Item] Load one',
  props<{ id: string }>()
);

export const loadOneSuccess = createAction(
  '[Community-Item] Load one (success)',
  props<{ item: Item }>()
);

export const loadMany = createAction(
  '[Community-Item] Load many',
  props<{ pageIndex: number }>()
);

export const loadManySuccess = createAction(
  '[Community-Item] Load many (success)',
  props<{ page: ApiPage<Item> }>()
);

export const failureAction = createAction(
  '[Community-Item] Failure',
  props<{ error: string }>()
);

export const saveListScrollPosition = createAction(
  '[Community-Item] Save list scroll position',
  props<{ listScrollPosition: number }>()
);

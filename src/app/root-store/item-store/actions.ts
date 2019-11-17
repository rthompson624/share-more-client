import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/core/models/item.model';
import { ApiPage } from 'src/app/core/models/api-page.model';

export const loadMany = createAction(
  '[Item] Load many',
  props<{ pageIndex: number }>()
);

export const loadManySuccess = createAction(
  '[Item] Load many (success)',
  props<{ page: ApiPage<Item> }>()
);

export const loadOne = createAction(
  '[Item] Load',
  props<{ id: string }>()
);

export const loadOneSuccess = createAction(
  '[Item] Load (success)',
  props<{ item: Item }>()
);

export const deleteOne = createAction(
  '[Item] Delete one',
  props<{ item: Item }>()
);

export const deleteOneSuccess = createAction(
  '[Item] Delete one (success)',
  props<{ item: Item }>()
);

export const updateOne = createAction(
  '[Item] Update one',
  props<{ item: Item }>()
);

export const updateOneSuccess = createAction(
  '[Item] Update one (success)',
  props<{ item: Item }>()
);

export const createOne = createAction(
  '[Item] Create one',
  props<{ item: Item }>()
);

export const createOneSuccess = createAction(
  '[Item] Create one (success)',
  props<{ item: Item }>()
);

export const failureAction = createAction(
  '[Item] Failure',
  props<{ error: string }>()
);

export const selectOne = createAction(
  '[Item] Select one',
  props<{ item: Item }>()
);

export const saveListScrollPosition = createAction(
  '[Item] Save list scroll position',
  props<{ listScrollPosition: number }>()
);

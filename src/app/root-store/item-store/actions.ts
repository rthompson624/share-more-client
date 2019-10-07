import { Action } from '@ngrx/store';
import { Item } from '../../core/models/item.model';
import { Multiple } from '../../core/models/multiple.model';

export enum ActionTypes {
  LOAD_MANY = '[item] Load many',
  LOAD_MANY_SUCCESS = '[item] Load many (success)',
  LOAD_ONE = '[item] Load',
  LOAD_ONE_SUCCESS = '[item] Load (success)',
  DELETE = '[item] Delete',
  DELETE_SUCCESS = '[item] Delete (success)',
  UPDATE = '[item] Update',
  UPDATE_SUCCESS = '[item] Update (success)',
  CREATE = '[item] Create',
  CREATE_SUCCESS = '[item] Create (success)',
  FAILURE = '[item] Failure',
  ROUTE_NAVIGATION = '[item] Route navigation',
  SELECT_ONE = '[item] Select'
}

export class LoadManyAction implements Action {
  readonly type = ActionTypes.LOAD_MANY;
  constructor(public payload: { pageIndex: number }) {}
}

export class LoadManySuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MANY_SUCCESS;
  constructor(public payload: Multiple<Item>) {}
}

export class LoadOneAction implements Action {
  readonly type = ActionTypes.LOAD_ONE;
  constructor(public payload: { id: string }) {}
}

export class LoadOneSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ONE_SUCCESS;
  constructor(public payload: Item) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: Item) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Item) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: Item) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Item) {}
}

export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: Item) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: Item) {}
}

export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error: string }) {}
}

export class RouteNavigationAction implements Action {
  readonly type = ActionTypes.ROUTE_NAVIGATION;
}

export class SelectOneAction implements Action {
  readonly type = ActionTypes.SELECT_ONE;
  constructor(public payload: Item) {}
}

export type Actions = 
  LoadManyAction|
  LoadManySuccessAction|
  LoadOneAction|
  LoadOneSuccessAction|
  DeleteAction|
  DeleteSuccessAction|
  UpdateAction|
  UpdateSuccessAction|
  CreateAction|
  CreateSuccessAction|
  FailureAction|
  RouteNavigationAction|
  SelectOneAction
;

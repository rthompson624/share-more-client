import { Action } from '@ngrx/store';
import { Trip } from '../../core/models/trip.model';
import { Multiple } from '../../core/models/multiple.model';

export enum ActionTypes {
  LOAD_MANY = '[trip] Load many',
  LOAD_MANY_SUCCESS = '[trip] Load many (success)',
  LOAD_ONE = '[trip] Load',
  LOAD_ONE_SUCCESS = '[trip] Load (success)',
  DELETE = '[trip] Delete',
  DELETE_SUCCESS = '[trip] Delete (success)',
  UPDATE = '[trip] Update',
  UPDATE_SUCCESS = '[trip] Update (success)',
  CREATE = '[trip] Create',
  CREATE_SUCCESS = '[trip] Create (success)',
  FAILURE = '[trip] Failure',
  ROUTE_NAVIGATION = '[trip] Route navigation',
  SELECT_ONE = '[trip] Select'
}

export class LoadManyAction implements Action {
  readonly type = ActionTypes.LOAD_MANY;
  constructor(public payload: { pageIndex: number }) {}
}

export class LoadManySuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MANY_SUCCESS;
  constructor(public payload: Multiple<Trip>) {}
}

export class LoadOneAction implements Action {
  readonly type = ActionTypes.LOAD_ONE;
  constructor(public payload: { id: number }) {}
}

export class LoadOneSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ONE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: Trip) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: Trip) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: Trip) {}
}

export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: Trip) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: Trip) {}
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
  constructor(public payload: Trip) {}
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

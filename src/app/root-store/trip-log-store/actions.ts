import { Action } from '@ngrx/store';
import { TripLog } from '../../core/models/trip-log.model';
import { Multiple } from '../../core/models/multiple.model';

export enum ActionTypes {
  LOAD_MANY = '[triplog] Load many',
  LOAD_MANY_SUCCESS = '[triplog] Load many (success)',
  LOAD_ONE = '[triplog] Load',
  LOAD_ONE_SUCCESS = '[triplog] Load (success)',
  DELETE = '[triplog] Delete',
  DELETE_SUCCESS = '[triplog] Delete (success)',
  UPDATE = '[triplog] Update',
  UPDATE_SUCCESS = '[triplog] Update (success)',
  CREATE = '[triplog] Create',
  CREATE_SUCCESS = '[triplog] Create (success)',
  FAILURE = '[triplog] Failure',
  ROUTE_NAVIGATION = '[triplog] Route navigation',
  SELECT = '[triplog] Select'
}

export class LoadManyAction implements Action {
  readonly type = ActionTypes.LOAD_MANY;
  constructor(public payload: { tripId: number, pageIndex: number }) {}
}

export class LoadManySuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MANY_SUCCESS;
  constructor(public payload: Multiple<TripLog>) {}
}

export class LoadOneAction implements Action {
  readonly type = ActionTypes.LOAD_ONE;
  constructor(public payload: { id: number }) {}
}

export class LoadOneSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ONE_SUCCESS;
  constructor(public payload: TripLog) {}
}

export class DeleteAction implements Action {
  readonly type = ActionTypes.DELETE;
  constructor(public payload: TripLog) {}
}

export class DeleteSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  constructor(public payload: TripLog) {}
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;
  constructor(public payload: TripLog) {}
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  constructor(public payload: TripLog) {}
}

export class CreateAction implements Action {
  readonly type = ActionTypes.CREATE;
  constructor(public payload: TripLog) {}
}

export class CreateSuccessAction implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  constructor(public payload: TripLog) {}
}

export class FailureAction implements Action {
  readonly type = ActionTypes.FAILURE;
  constructor(public payload: { error: string }) {}
}

export class RouteNavigationAction implements Action {
  readonly type = ActionTypes.ROUTE_NAVIGATION;
}

export class SelectAction implements Action {
  readonly type = ActionTypes.SELECT;
  constructor(public payload: TripLog) {}
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
  SelectAction
;

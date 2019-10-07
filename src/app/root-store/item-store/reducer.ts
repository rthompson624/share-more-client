import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function itemReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_MANY: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_MANY_SUCCESS: {
      return featureAdapter.addAll(action.payload.data, {
        ...state,
        page: {
          total: action.payload.total,
          limit: action.payload.limit,
          skip: action.payload.skip
        },
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.LOAD_ONE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_ONE_SUCCESS: {
      return featureAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.DELETE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.DELETE_SUCCESS: {
      return featureAdapter.removeOne(action.payload._id, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.UPDATE_SUCCESS: {
      return featureAdapter.updateOne(
        {
          id: action.payload._id,
          changes: action.payload
        },
        {
        ...state,
        isLoading: false,
        error: null
        }
      );
    }
    case ActionTypes.CREATE: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.CREATE_SUCCESS: {
      return featureAdapter.addOne(action.payload, {
        ...state,
        isLoading: false,
        error: null
      });
    }
    case ActionTypes.FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    case ActionTypes.SELECT_ONE: {
      return {
        ...state,
        selectedItem: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
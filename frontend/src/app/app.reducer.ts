import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  Action
} from "@ngrx/store";
import * as fromUi from "./shared/ui.reducer";
import * as fromAuth from "src/app/core/auth/store/auth.reducer";

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUi.State>("ui");
export const getIsLoading = createSelector(
  getUiState,
  fromUi.getIsLoading
);
export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsAuthenticated
);

export class ActionTypes {
  static LOGOUT = "[App] logout";
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export function clearState(reducer) {
  return function(state, action) {
    if (action.type === ActionTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
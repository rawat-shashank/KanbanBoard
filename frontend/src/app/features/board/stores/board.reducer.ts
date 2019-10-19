import {
  BoardActions,
  SET_TODO,
  SET_INPROGRESS,
  SET_DONE
} from "./board.actions";
import { TaskList } from "../board.model";
import * as fromRoot from "src/app/app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface BoardState {
  todo: TaskList;
  inProgress: TaskList;
  done: TaskList;
}

export interface State extends fromRoot.State {
  board: BoardState;
}

const initialState: BoardState = {
  todo: [],
  inProgress: [],
  done: []
};

export function boardReducer(state = initialState, action: BoardActions) {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todo: [...state.todo, action.payload]
      };
      break;

    case SET_INPROGRESS:
      return {
        ...state,
        inProgress: [...state.inProgress, action.payload]
      };
      break;

    case SET_DONE:
      return {
        ...state,
        done: [...state.done, action.payload]
      };
      break;

    default:
      return state;
      break;
  }
}

export const getBoardState = createFeatureSelector<BoardState>("board");

export const getTodo = createSelector(
  getBoardState,
  (state: BoardState) => state.todo
);
export const getInProgress = createSelector(
  getBoardState,
  (state: BoardState) => state.inProgress
);
export const getDone = createSelector(
  getBoardState,
  (state: BoardState) => state.done
);

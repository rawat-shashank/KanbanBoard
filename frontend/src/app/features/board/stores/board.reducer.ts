import {
  BoardActions,
  UPDATE_TASK,
  SET_TASKS,
  ADD_TODO
} from "./board.actions";
import { TaskList, TaskType } from "../board.model";
import * as fromRoot from "src/app/app.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface BoardState {
  tasks: TaskList;
}

export interface State extends fromRoot.State {
  board: BoardState;
}

const initialState: BoardState = {
  tasks: []
};

export function boardReducer(state = initialState, action: BoardActions) {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
      break;

    case ADD_TODO:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      break;

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(el => {
          if (el.id === action.payload.id) {
            return action.payload;
          } else {
            return el;
          }
        })
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
  (state: BoardState) => {
    if ([...state.tasks]) {
      return state.tasks.filter(el => el.type === TaskType.todo);
    }
  }
);
export const getInProgress = createSelector(
  getBoardState,
  (state: BoardState) => {
    if ([...state.tasks]) {
      return state.tasks.filter(el => el.type === TaskType.inProgress);
    }
  }
);
export const getDone = createSelector(
  getBoardState,
  (state: BoardState) => {
    if ([...state.tasks]) {
      return state.tasks.filter(el => el.type === TaskType.done);
    }
  }
);

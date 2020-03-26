import { Action } from "@ngrx/store";
import { Task, TaskList } from "../board.model";

export const SET_TASKS = "[Board] Get Tasks";
export const ADD_TODO = "[Board] Add Todo";
export const UPDATE_TASK = "[Board] Update Task";

export class SetTasks implements Action {
  readonly type = SET_TASKS;
  constructor(public payload: TaskList) {}
}

export class AddTodo implements Action {
  readonly type = ADD_TODO;
  constructor(public payload: Task) {}
}

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: Task) {}
}

export type BoardActions = SetTasks | AddTodo | UpdateTask;

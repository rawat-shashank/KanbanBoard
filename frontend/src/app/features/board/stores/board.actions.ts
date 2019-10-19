import { Action } from '@ngrx/store'; 
import { TaskList, Task } from '../board.model';

export const SET_TODO = '[Board] Set Todo';
export const SET_INPROGRESS = '[Board] Set Inprogress';
export const SET_DONE = '[Board] Set Done';
// export const SET_UNAUTHENTICATED = '[Auth] Stop Unauthentcated';

export class SetTodo implements Action {
    readonly type = SET_TODO;

    constructor(public payload: Task) {}
}

export class SetInprogress implements Action {
    readonly type = SET_INPROGRESS;
    constructor(public payload: Task) {}
}

export class SetDone implements Action {
    readonly type = SET_DONE;
    constructor(public payload: Task) {}
}

export type BoardActions =  SetTodo | SetInprogress | SetDone;
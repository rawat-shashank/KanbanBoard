import { Action } from '@ngrx/store'; 

export const SET_AUTHENTICATED = '[Auth] Start Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Stop Unauthentcated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthentcated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthentcated;
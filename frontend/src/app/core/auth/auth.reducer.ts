import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED  } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
};

const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            }
            break;

        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            }
            break;
    
        default:
            return state;
            break;
    }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
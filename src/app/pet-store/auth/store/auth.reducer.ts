import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AuthActions from './auth.actions';


export interface State {
    isAuthenticated: boolean;
    userId: string | number;
    loginError: string;
    registerError: string;
    isLoading: boolean;
}

export const initialState: State = {
    isAuthenticated: false,
    userId: null,
    loginError: null,
    registerError: null,
    isLoading: false
}

const _authReducer = createReducer(
    initialState,
    on(AuthActions.authInit, (state: State) => ({...state, isLoading: true})),
    on(AuthActions.addUserLocalStorage, (state: State, { userId } ) => {
        return {
            ...state,
            userId: userId,
            isAuthenticated: true,
            isLoading: false
        }
    }),
    on(AuthActions.loadUserId, (state: State, { userId }) => {
        return {
            ...state,
            userId: userId,
            isLoading: false
        }
    }),
    on(AuthActions.authFailure, (state: State, { errorRes }) => {
        if (errorRes.error.type === 'login') {
            console.log(errorRes.error.message);
            return {
                ...state,
                isAuthenticated: false,
                loginError: errorRes.error.message,
                registerError: null,
                isLoading: false
            }
        } else if (errorRes.error.type === 'register'){
            return {
                ...state,
                isAuthenticated: false,
                loginError: null,
                registerError: errorRes.error.message,
                isLoading: false
            }
        }
    }),
    on(AuthActions.logout, (state: State) => initialState)
)

export function authReducer(authState: State = initialState, AuthActions) {
    return _authReducer(authState, AuthActions)
}

export const selectAuthState = createFeatureSelector<State>('auth');
export const getUserId = createSelector(selectAuthState, state => state.userId);
export const getLoadingState = createSelector(selectAuthState, (state: State) => state.isLoading);
export const getLoginError = createSelector(selectAuthState, state => state.loginError);
export const getRegisterError = createSelector(selectAuthState, state => state.registerError);

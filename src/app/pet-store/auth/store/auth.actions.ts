import { createAction, props } from '@ngrx/store';

export interface Auth {
    authType: string,
    email: string,
    password: string,
    fullName?: string
}

export const authInit = createAction('[Auth] Authentication Initialization', props<{ authType: string, email: string, password: string, fullName?:string }>());
export const authSuccess = createAction('[Auth API] Authentication Success', props<{ token: any, userId: string }>());
export const addUserLocalStorage = createAction('[Auth] Add User Data to Local Storage', props<{ userId: any }>());
export const fetchUserId = createAction('[Auth] Fetch User ID From LocalStorage');
export const loadUserId = createAction('[Auth] Load User ID From LocalStorage', props<{ userId: string | number }>());
export const authFailure = createAction('[Auth API] Auth Failure', props<{ errorRes: any }>());
export const logout = createAction('[Auth] Logout');



import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from '../../interfaces/user';


export interface State {
    user: User;
    orderDetails: any;
    isLoading: boolean;
    inProcess: boolean;
    error: any;
}

export const initialState: State = {
    user: null,
    orderDetails: null,
    isLoading: false,
    inProcess: false,
    error: null
};

const _userReducer = createReducer(
    initialState,
    on(UserActions.userInit, (state: State) => ({ ...state, isLoading: true })),
    on(UserActions.loadUserDetails, (state: State, { user }) => {
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }),
    on(UserActions.confirmPayment, (state: State) => ({ ...state, inProcess: true })),
    on(UserActions.paymentResult, (state: State, { res }) => {
        if (!res.success) {
            return {
                ...state,
                inProcess: false,
                error: res.message
            }
        } else {
            return {
                ...state,
                inProcess: false,
                orderDetails: res.orderDetails
            }
        }
    })
)


export function userReducer(userState: State = initialState, userAction) {
    return _userReducer(userState, userAction)
}

export const getUserState = createFeatureSelector<State>('user');
export const getUser = createSelector(getUserState, (state: State) => state.user);
export const getOrders = createSelector(getUserState, (state: State) => state.user.orders);
export const getOrderDetails = createSelector(getUserState, (state: State) => state.orderDetails);
export const geProcessState = createSelector(getUserState, (state: State) => state.inProcess);
export const getLoadingState = createSelector(getUserState, (state: State) => state.isLoading);
export const getPaymentResult = createSelector(getUserState, (state: State) => state.error);


import { createAction, props } from '@ngrx/store';
import { Order } from '../../interfaces/order';
import { User } from '../../interfaces/user';

export const userInit = createAction('[User] User Initialization');
export const loadUserDetails = createAction('[User API] Load User Details', props<{ user: User }>());
export const confirmPayment = createAction('[User] Confirm Payment', props<{ order: Order }>());
export const paymentResult = createAction('[User API] Payment Result', props<{ res: any }>());





import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from './user.actions';
import * as PetStoreActions from '../../store/pet-store.actions';
import { LocalStorageService } from '../../local-storage.service';
import { UserService } from '../user.service';
import { User } from '../../interfaces/user';



@Injectable()
export class UserEffects {

    userInit$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.userInit),
        map((action: any) => {
            let userId = this.localStorageService.getItem('userData');
            return userId;
        }),
        switchMap(userId => this.userService.getUserDetails(userId)),
        map((userData) => {
            let user = userData.user;
            return user;
        }),
        map((user: User) => UserActions.loadUserDetails({ user: user })
        )
    )
    )

    paymentProcess$ = createEffect(() => this.actions$.pipe(
        ofType(UserActions.confirmPayment),
        switchMap((action: any) => this.userService.payment(action.order).
            pipe(
                tap(() => this.localStorageService.setItem('cartItems', [])),
                switchMap((res) => [
                    UserActions.paymentResult({ res: res }),
                    PetStoreActions.fetchCart({ payload: this.localStorageService.getItem('cartItems') })
                ]),
                catchError((error) => {
                    return of(UserActions.paymentResult({ res: error.message }))
                })
            ))
    )
    )

    constructor(private actions$: Actions, private router: Router, private userService: UserService, private localStorageService: LocalStorageService) { }

}


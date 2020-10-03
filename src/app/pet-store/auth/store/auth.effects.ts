import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { LocalStorageService } from '../../local-storage.service';
import { AuthService } from '../auth.service';


@Injectable()
export class AuthEffects {

    Auth$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authInit),
        switchMap((authPayload: AuthActions.Auth) => {
            if (authPayload.authType === 'login') {
                return this.authService.logIn(authPayload.email, authPayload.password)
            } else if (authPayload.authType === 'register') {
                return this.authService.signUp(authPayload.email, authPayload.password, authPayload.fullName)
            }
        }),
        map((res: any) => AuthActions.authSuccess({ token: res.token, userId: res.user.userId })),
        catchError((error) => of(AuthActions.authFailure({ errorRes: error })))
    )
    );

    AuthSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap((userData: any) => {
            this.localStorageService.setItem('token', userData.token);
            this.localStorageService.setItem('userData', userData.userId);
            this.router.navigateByUrl('/store');
        }),
        map((data) => AuthActions.addUserLocalStorage({ userId: this.localStorageService.getItem('userData') }))
    )
    );

    AuthUserId$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.fetchUserId),
        map((action) => AuthActions.loadUserId({ userId: this.localStorageService.getItem('userData') }))
    )
    );

    Logout$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
            this.localStorageService.removeItem('token');
            this.localStorageService.removeItem('userData');
            this.router.navigateByUrl('/store');
        })
    ), { dispatch: false }
    );


    constructor(private actions$: Actions, private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }

}





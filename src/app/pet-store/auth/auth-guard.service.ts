import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';


class Permissions {
    canActivate(): boolean {
        let token = window.sessionStorage.getItem('token');
        return token ? true : false;
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let token = window.localStorage.getItem('token');

        if (!token) {
            this.router.navigateByUrl('store/auth');
            return false;
        }
        return true;
    }
}

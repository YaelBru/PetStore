import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as UserActions from './store/user.actions';
import * as fromUser from './store/user.reducer';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user$: Observable<User> = this.store.select(fromUser.getUser);
  isLoading$: Observable<boolean> = this.store.select(fromUser.getLoadingState);

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(UserActions.userInit());
  }

  logOut() {
    this.store.dispatch(AuthActions.logout());
  }

}

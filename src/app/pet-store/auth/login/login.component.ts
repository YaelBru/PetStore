import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as fromAuth from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  errorMessage$: Observable<any> = this.store.select(fromAuth.getLoginError);
  isLoading$: Observable<boolean> = this.store.select(fromAuth.getLoadingState);

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.createAuthForm();
  }

  createAuthForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]] //TODO: add- Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
    });
  }

  login() {
    this.store.dispatch(AuthActions.authInit({
      authType: 'login',
      email: this.authForm.value.email,
      password: this.authForm.value.password
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as fromAuth from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  authForm: FormGroup;
  errorMessage$: Observable<any> = this.store.select(fromAuth.getRegisterError);
  isLoading$: Observable<boolean> = this.store.select(fromAuth.getLoadingState);

  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.createAuthForm();
  }

  createAuthForm() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]]

    })
  }

  register() {
    this.store.dispatch(AuthActions.authInit({
      authType: 'register',
      email: this.authForm.value.email,
      fullName: this.authForm.value.fullName,
      password: this.authForm.value.password }));
  }
}

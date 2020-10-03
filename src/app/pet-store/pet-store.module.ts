import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetStoreRoutingModule } from './pet-store-routing.module';
import { SharedModule } from '../shared/shared.modules';
import { StoreModule } from '@ngrx/store';
import { petStoreReducer } from './store/pet-store.reducer';
import { PetStoreComponent } from './pet-store.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { CartComponent } from './cart/cart.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { UserComponent } from './user/user.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentComponent } from './checkout/payment/payment.component';


@NgModule({
  declarations: [
    PetStoreComponent,
    ItemListComponent,
    ItemDetailsComponent,
    CartComponent,
    CartModalComponent,
    UserComponent,
    CheckoutComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PetStoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('petStore', petStoreReducer)
  ],
  entryComponents: [
    PaymentComponent
  ]
})
export class PetStoreModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentComponent } from './payment/payment.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as UserActions from '../user/store/user.actions';
import * as AuthActions from '../auth/store/auth.actions';
import { Order } from '../interfaces/order';
import { SelectedItem } from '../interfaces/Item';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  checkoutSubscription: Subscription; 
  orderItems: SelectedItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  userId: string | number;

  checkoutForm: FormGroup;
 
  constructor(private fb: FormBuilder, private store: Store<fromApp.AppState>, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.store.dispatch(AuthActions.fetchUserId());
    this.checkoutSubscription = this.store.select(state => state).subscribe(appState => {
      this.userId = appState.auth.userId;
      this.orderItems = appState.petStore.cartItems;
      this.totalPrice = appState.petStore.itemsTotalPrice;
      this.totalQuantity = appState.petStore.itemsTotalQuantity
    });
    this.createCheckoutForm();
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      fullName: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: [null, [Validators.required, Validators.email]],
      shippingAddress: [null, [Validators.required]],
      orderNotes: [null],
      payment: this.fb.group({
        creditCard: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        creditCardName: [null, [Validators.required]],
        expDate: [null, [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{2})$')]],
        cvv: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      })
    })
  }

  submitPayment() {
    const order: Order = {
      userId: this.userId,
      billingDetails: {
        fullName: this.checkoutForm.value.fullName,
        mobile: this.checkoutForm.value.mobile,
        email: this.checkoutForm.value.email,
        shippingAddress: this.checkoutForm.value.shippingAddress,
        orderNotes: this.checkoutForm.value.orderNotes || '',
        payment: {
          type: 'Credit Card',
          creditCard: this.checkoutForm.value.payment.creditCard,
          creditCardName: this.checkoutForm.value.payment.creditCardName,
          expDate: this.checkoutForm.value.payment.expDate,
          cvv: this.checkoutForm.value.payment.cvv,
        }
      },
      orderDetails: {
        orderItems: this.orderItems,
        itemsTotalPrice: this.totalPrice,
        itemsTotalQuantity: this.totalQuantity
      }
    };

    !this.checkoutForm.valid ? false : this.store.dispatch(UserActions.confirmPayment({ order: order }));
  }

  open() {
    const modalRef = this.modalService.open(PaymentComponent, { size: 'lg', scrollable: true });
  }

  ngOnDestroy() {
    this.checkoutSubscription.unsubscribe();
  }

}

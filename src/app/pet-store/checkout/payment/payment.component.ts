import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import * as fromUser from "../../user/store/user.reducer";
import { ConfirmedOrder } from '../../interfaces/order';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  orderDetails$: Observable<ConfirmedOrder> = this.store.select(fromUser.getOrderDetails);
  isLoading$: Observable<boolean> = this.store.select(fromUser.getLoadingState);
  inProcess$: Observable<boolean> = this.store.select(fromUser.geProcessState);

  constructor(private store: Store<fromApp.AppState>, public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.router.navigateByUrl('store');
  }

}


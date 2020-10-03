import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectedItem } from '../interfaces/Item';
import * as fromApp from '../../store/app.reducer';
import * as fromPetStore from '../store/pet-store.reducer';
import * as fromUser from '../user/store/user.reducer';
import { User } from '../interfaces/user';


@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  providers: [NgbModal]
})
export class CartModalComponent implements OnInit {

  user$: Observable<User> = this.store.select(fromUser.getUser);
  shoppingCartItems$: Observable<SelectedItem[]> = this.store.select(fromPetStore.getCartItems)
  totalQuantity$: Observable<number> = this.store.select(fromPetStore.getItemsTotalQuantity)

  constructor(private store: Store<fromApp.AppState>, private modalService: NgbModal) { }

  ngOnInit() { }

  openScrollableContent(longContent) {
    this.modalService.open(longContent, { scrollable: true });
  }

}

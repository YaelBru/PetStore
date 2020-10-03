import { Component, OnInit } from '@angular/core';
import { SelectedItem } from '../interfaces/Item';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromPetStore from '../store/pet-store.reducer';
import * as PetStoreActions from '../store/pet-store.actions';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shoppingCartItems$: Observable<SelectedItem[]> = this.store.select(fromPetStore.getCartItems)
  totalPrice$: Observable<number> = this.store.select(fromPetStore.getItemsTotalPrice)
  totalQuantity$: Observable<number> = this.store.select(fromPetStore.getItemsTotalQuantity)

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {}

  updateItemQuantity(action: string, itemId: string) {
    this.store.dispatch(PetStoreActions.updateLocalStorage({ action: action, itemId: itemId }))
  }

  removeItem(itemId: string) {
    this.store.dispatch(PetStoreActions.removeItem({ itemId: itemId }));
  }
}

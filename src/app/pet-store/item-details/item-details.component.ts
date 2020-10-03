import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as fromPetStore from '../store/pet-store.reducer';
import * as PetStoreActions from '../store/pet-store.actions';
import { Item } from '../interfaces/Item';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  itemQuantity: number = 1;
  itemId: string | number;
  item: Item;

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.itemId = params.itemId);
    this.subscription = this.store.pipe(select(fromPetStore.getItem, this.itemId)).subscribe(item => this.item = item);
  }

  increment() {
    this.itemQuantity = ++this.itemQuantity;
  }

  decrement() {
    this.itemQuantity == 0 ? 0 : --this.itemQuantity;
  }

  addToCart() {
    this.store.dispatch(PetStoreActions.addItemLocalStorage({ selectedItem: this.item, itemQuantity: this.itemQuantity }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

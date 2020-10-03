import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import * as PetStoreActions from './pet-store.actions';
import { PetStoreService } from '../pet-store.service';
import { LocalStorageService } from '../local-storage.service';
import { SelectedItem } from '../interfaces/Item';


@Injectable()
export class PetStoreEffects {

    init$ = createEffect(() => this.actions$.pipe(
        ofType(PetStoreActions.petStoreInit),
        switchMap((action: any) => this.petStoreService.getAllItems()),
        switchMap(items => [
            PetStoreActions.loadItemsSuccess({ payload: items }),
            PetStoreActions.fetchCart({ payload: this.localStorageService.getItem('cartItems') || [] }),
        ])
    )
    )

    addToLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(PetStoreActions.addItemLocalStorage),
        map((payload: any) => {
            let _payload = Object.assign({}, payload);
            _payload.itemTotalPrice = payload.itemQuantity * payload.selectedItem.price;

            let cartItemsLocalStorage: SelectedItem[] = this.localStorageService.getItem('cartItems') || [];
            let index = cartItemsLocalStorage.findIndex(item => item.selectedItem._id === payload.selectedItem._id);

            if (cartItemsLocalStorage.length && index !== -1) {
                cartItemsLocalStorage[index].itemQuantity = cartItemsLocalStorage[index].itemQuantity + _payload.itemQuantity;
                cartItemsLocalStorage[index].itemTotalPrice = cartItemsLocalStorage[index].itemQuantity * cartItemsLocalStorage[index].selectedItem.price;

            } else {
                cartItemsLocalStorage.push(_payload);
            }

            this.localStorageService.setItem('cartItems', cartItemsLocalStorage);
            return cartItemsLocalStorage;
        }),
        map((localStorageItems) => PetStoreActions.fetchCart({payload: this.localStorageService.getItem('cartItems')}))
    ));

    updateLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(PetStoreActions.updateLocalStorage),
        map((payload: any) => {
            let cartItemsLocalStorage: any[] = this.localStorageService.getItem('cartItems') || [];
            let index = cartItemsLocalStorage.findIndex(item => item.selectedItem._id == payload.itemId);

            switch (payload.action) {
                case 'increment':
                    cartItemsLocalStorage[index].itemQuantity++;
                    cartItemsLocalStorage[index].itemTotalPrice = cartItemsLocalStorage[index].itemTotalPrice + cartItemsLocalStorage[index].selectedItem.price;
                    break;
                case 'decrement':
                    cartItemsLocalStorage[index].itemQuantity--;
                    cartItemsLocalStorage[index].itemTotalPrice = cartItemsLocalStorage[index].itemTotalPrice - cartItemsLocalStorage[index].selectedItem.price;
                    break;
                default:
                    return 'Action not supported';
            };

            if (cartItemsLocalStorage[index].itemQuantity <= 0) cartItemsLocalStorage.splice(index, 1);
            this.localStorageService.setItem('cartItems', cartItemsLocalStorage);
            return cartItemsLocalStorage;
        }),
        map((localStorageItems) => PetStoreActions.fetchCart({ payload: this.localStorageService.getItem('cartItems') }))
    ));

    removeFromLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(PetStoreActions.removeItem),
        map((payload: any) => {
            let cartItemsLocalStorage: any[] = this.localStorageService.getItem('cartItems') || [];
            let index = cartItemsLocalStorage.findIndex(item => item.selectedItem._id == payload.itemId);

            cartItemsLocalStorage.splice(index, 1);
            this.localStorageService.setItem('cartItems', cartItemsLocalStorage);
            return cartItemsLocalStorage;
        }),
        map((localStorageItems) => PetStoreActions.fetchCart({ payload: this.localStorageService.getItem('cartItems') }))
    ));


    constructor(private actions$: Actions, private petStoreService: PetStoreService, private localStorageService: LocalStorageService) { }

}





import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as PetStoreActions from './pet-store.actions';
import { Item, SelectedItem } from '../interfaces/Item';
import { Order } from '../interfaces/order';

export interface State {
    petStoreItems: Item[];
    selectedByItems: Item[];
    cartItems: SelectedItem[];
    searchedItems: Item[];
    itemsTotalPrice: number;
    itemsTotalQuantity: number;
    orderDetails: Order;
    error: any;
    isLoading: boolean;
}

export const initialState: State = {
    petStoreItems: [],
    selectedByItems: [],
    cartItems: [],
    searchedItems: [],
    itemsTotalPrice: 0,
    itemsTotalQuantity: 0,
    orderDetails: null,
    error: null,
    isLoading: false
};

const _petStoreReducer = createReducer(
    initialState,
    on(PetStoreActions.petStoreInit, (state: State) => ({ ...state, isLoading: true })),
    on(PetStoreActions.loadItemsSuccess, (state: State, { payload }) => ({ ...state, petStoreItems: [...payload], isLoading: false })),
    on(PetStoreActions.getAllItems, (state: State) => ({ ...state, selectedByItems: [] })),
    on(PetStoreActions.selectItemsBy, (state: State, { selector, category, subcategory, brand, searchInput }) => {
        switch (selector) {
            case 'category':
                return {
                    ...state,
                    selectedByItems: state.petStoreItems.filter((petStoreItem) => subcategory ? petStoreItem.category == category && petStoreItem.subcategory == subcategory : petStoreItem.category == category)
                };
            case 'brand':
                return {
                    ...state,
                    selectedByItems: state.petStoreItems.filter((petStoreItem) => petStoreItem.brand === brand)
                };
            case 'search':
                let searched: Item[] = state.petStoreItems.filter((petStoreItem) => petStoreItem.name.toLowerCase().includes(searchInput.toLowerCase()));
                return {
                    ...state,
                    selectedByItems: searched,
                    error: searched.length ? null : 'No Items Found'
                };
            default:
                return { ...state }
        };
    }),
    on(PetStoreActions.fetchCart, (state: State, { payload }) => {
        if (payload.length) {
            let itemsQuantity = 0;
            let itemsPrice = 0
            payload.forEach(item => {
                itemsQuantity = itemsQuantity + item.itemQuantity;
                itemsPrice = itemsPrice + (item.selectedItem.price * item.itemQuantity);
            });
            return {
                ...state,
                cartItems: [...payload],
                itemsTotalPrice: itemsPrice,
                itemsTotalQuantity: itemsQuantity
            }
        } else {
            return {
                ...state,
                cartItems: payload,
                itemsTotalQuantity: 0
            }
        }
    })
)


export function petStoreReducer(petStoreState: State = initialState, petStoreAction) {
    return _petStoreReducer(petStoreState, petStoreAction)
}

export const getPetStoreState = createFeatureSelector<State>('petStore');
export const getItem = createSelector(getPetStoreState, (state: State, props: string | number) => state.petStoreItems.find(petStoreItem => petStoreItem._id === props));
export const getCartItems = createSelector(getPetStoreState, (state: State) => state.cartItems);
export const getItemsTotalPrice = createSelector(getPetStoreState, (state: State) => state.itemsTotalPrice);
export const getItemsTotalQuantity = createSelector(getPetStoreState, (state: State) => state.itemsTotalQuantity);
export const getOrderDetails = createSelector(getPetStoreState, (state: State) => state.orderDetails);
export const getLoadingState = createSelector(getPetStoreState, (state: State) => state.isLoading);

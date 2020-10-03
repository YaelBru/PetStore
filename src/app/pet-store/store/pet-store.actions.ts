import { createAction, props } from '@ngrx/store';
import { Item, SelectedItem } from '../interfaces/Item';


export const petStoreInit = createAction('[Pet Store] Pet Store Initialization');
export const getAllItems = createAction('[Pet Store] Get All Items');
export const selectItemsBy = createAction('[Pet Store] Select Items By Category or Brand', props<{ selector: string, category?: string, subcategory?: string, brand?: string, searchInput?: string }>());
export const loadItemsSuccess = createAction('[Pet Store API] Load Items Success', props<{ payload: Item[] }>());
export const addItemLocalStorage = createAction('[Pet Store] Add Item to Local Storage', props<{ selectedItem: Item, itemQuantity: number }>());
export const updateLocalStorage = createAction('[Pet Store] Update Item In Local Storage', props<{ action: string, itemId: string }>())
export const removeItem = createAction('[Pet Store] Remove Item From Local Storage', props<{ itemId: string }>())
export const fetchCart = createAction('[Pet Store API] Load Cart Properties From Local Storage', props<{ payload: SelectedItem[] }>());












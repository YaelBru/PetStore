import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import * as PetStoreActions from '../store/pet-store.actions';
import { PetStoreService } from '../pet-store.service';
import { Item } from '../interfaces/Item';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  page: number = 1;
  pageSize: number = 8;
  itemListSubscription: Subscription;
  brands: string[] = [];
  categories: Category[] = [];
  petStoreItems: Item[] = [];
  errorMessage: string = null;

  constructor(private store: Store<fromApp.AppState>, private petStoreService: PetStoreService) { }

  ngOnInit() {
    this.itemListSubscription = this.store.pipe(
      select(state => state.petStore),
      tap(petStoreState => petStoreState.error ? this.errorMessage = petStoreState.error : this.errorMessage = null),
      map(petStoreState => petStoreState.selectedByItems.length ? petStoreState.selectedByItems : petStoreState.petStoreItems),
    ).subscribe(items => this.petStoreItems = items);
    this.categories = this.petStoreService.categoriesList;
    this.brands = this.petStoreService.brandsList;
  }

  getAllItems() {
    this.store.dispatch(PetStoreActions.getAllItems());
  }

  getItemsByCategory(selector: string, category: string, subcategory: string) {
    this.store.dispatch(PetStoreActions.selectItemsBy({ selector: selector, category: category, subcategory: subcategory }));
  }

  getItemsByBrandName(selector: string, brand: string) {
    this.store.dispatch(PetStoreActions.selectItemsBy({ selector: selector, brand: brand }));
  }

  ngOnDestroy() {
    this.itemListSubscription.unsubscribe();
  }
}


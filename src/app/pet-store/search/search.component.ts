import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as PetStoreActions from '../store/pet-store.actions';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = new FormControl('');

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(value => {
      this.store.dispatch(PetStoreActions.selectItemsBy({ selector: 'search', searchInput: value }))
    })
  }
}

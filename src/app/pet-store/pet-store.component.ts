import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as PetStoreActions from './store/pet-store.actions';
import * as fromPetStore from './store/pet-store.reducer';



@Component({
  selector: 'app-pet-store',
  templateUrl: './pet-store.component.html',
  styleUrls: ['./pet-store.component.css']
})

export class PetStoreComponent implements OnInit {

  isLoading$: Observable<boolean> = this.store.select(fromPetStore.getLoadingState);

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(PetStoreActions.petStoreInit());
  }

}



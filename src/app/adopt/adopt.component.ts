import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as fromAdoption from './store/adopt.reducer';
import * as AdoptionSectionActions from './store/adopt.actions';
import { Pet } from './pet';


@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit {

  adoptionList$: Observable<Pet[]> = this.store.select(fromAdoption.getAdoptionList);
  isLoading$: Observable<boolean> = this.store.select(fromAdoption.getLoadingState);

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(AdoptionSectionActions.adoptionSectionInit());
  }

}

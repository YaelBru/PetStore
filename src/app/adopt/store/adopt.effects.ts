import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import * as AdoptionSectionActions from './adopt.actions';
import { AdoptService } from '../adopt.service';

@Injectable()
export class AdoptionSectionEffects {

    adoptionSectionInit$ = createEffect(() => this.actions$.pipe(
        ofType(AdoptionSectionActions.adoptionSectionInit),
        switchMap((action: any) => this.adoptService.getPetsList()),
        map(petsList => AdoptionSectionActions.loadPetsList({ petsList: petsList }))
        )
    )
    
    constructor(private actions$: Actions, private adoptService: AdoptService) { }

}

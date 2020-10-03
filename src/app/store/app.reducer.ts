import { ActionReducerMap } from '@ngrx/store';
import * as fromPetStore from '../pet-store/store/pet-store.reducer';
import * as fromAuth from '../pet-store/auth/store/auth.reducer';
import * as fromUser from '../pet-store/user/store/user.reducer';
import * as fromAdoptionSection from '../adopt/store/adopt.reducer';


export interface AppState {
    petStore: fromPetStore.State;
    auth: fromAuth.State;
    user: fromUser.State,
    adoptionSection: fromAdoptionSection.State
}

export const reducers: ActionReducerMap<AppState> = {
    petStore: fromPetStore.petStoreReducer,
    auth: fromAuth.authReducer,
    user: fromUser.userReducer,
    adoptionSection: fromAdoptionSection.adoptionSectionReducer
};

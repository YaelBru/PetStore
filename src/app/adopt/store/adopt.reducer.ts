import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AdoptionSectionActions from './adopt.actions';
import { Pet } from '../pet';

export interface State {
    petsList: Pet[],
    isLoading: boolean
};

export const initialState: State = {
    petsList: [],
    isLoading: false
};

const _adoptionSectionReducer = createReducer(
    initialState,
    on(AdoptionSectionActions.adoptionSectionInit, (state: State) => ({ ...state, isLoading: true })),
    on(AdoptionSectionActions.loadPetsList, (state: State, { petsList }) => {
        return {
            ...state,
            petsList: petsList,
            isLoading: false
        };
    })
);

export function adoptionSectionReducer(adoptionSectionState: State = initialState, adoptionSectionAction) {
    return _adoptionSectionReducer(adoptionSectionState, adoptionSectionAction);
};

export const getAdoptionSectionState = createFeatureSelector<State>('adoptionSection');
export const getAdoptionList = createSelector(getAdoptionSectionState, (state: State) => state.petsList);
export const getLoadingState = createSelector(getAdoptionSectionState, (state: State) => state.isLoading);



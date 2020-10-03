import { createAction, props } from '@ngrx/store';
import { Pet } from '../pet';

export const adoptionSectionInit = createAction('[Adoption Section] Adoption Section Initialization');
export const loadPetsList = createAction('[Adoption Section API] Load Pets List', props<{ petsList: Pet[] }>());
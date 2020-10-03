import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './interfaces/category';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PetStoreService {

  brandsList: string[] = ['royal-canin', "pure-vita", "healthy-bites", "rosewood", "kit-cat", 'whisker-city', 'petstages', 'petlinks', "happy-cat", 'purina', 'ever-clean', 'petSafe', 'petmate'];
  categoriesList: Category[] = [
    {
      category: 'cats',
      subcategories: ['food', 'treats', 'toys', 'litter']
    },
    {
      category: 'dogs',
      subcategories: ['food', 'treats', 'toys']
    },
    {
      category: 'other-animals',
      subcategories: ['fish', 'birds', 'small-pets']
    }
  ];


  constructor(private http: HttpClient) { }

  getAllItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/store-items`);
  }
}



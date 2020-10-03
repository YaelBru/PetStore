import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AdoptService {

  constructor(private http: HttpClient) { }

  getPetsList(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/adoption-section`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/user`, { params: { userId: userId } });
  }

  payment(orderDetails: Order): Observable<any> {
    return this.http.post(`${environment.apiUrl}/orders/submit`, { orderDetails });
  }
}

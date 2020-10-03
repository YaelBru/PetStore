import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { User } from '../interfaces/user';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getToken(): string {
    return this.localStorageService.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<User>(url, { email, password }, { headers: this.headers });
  }

  signUp(email: string, fullName: string, password: string): Observable<User> {
    const url = `${environment.apiUrl}/auth/register`;
    return this.http.post<User>(url, { email, fullName, password });
  }
  
}

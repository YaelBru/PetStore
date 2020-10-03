import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './Message';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  onSubmitMessage(message: Message): Observable<any>  {
    return this.http.post(`${environment.apiUrl}/contact-us/submit`, message);
  }

}

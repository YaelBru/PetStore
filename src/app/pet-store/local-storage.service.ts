import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  setItem(key: string, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }

}

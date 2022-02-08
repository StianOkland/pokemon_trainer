import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedIn: boolean = false;

  setLogginTrue(): boolean {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(true))
    return this.loggedIn;
  }

  setLogginFalse(): boolean {
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(false))
    return this.loggedIn;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}

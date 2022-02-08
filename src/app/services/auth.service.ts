import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedInStorage: string | null = localStorage.getItem('isLoggedIn')
  loggedIn: boolean | null = (this.loggedInStorage !== null)? JSON.parse(this.loggedInStorage) : null;

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
    if (this.loggedIn === null){
      return false;
    }
    return this.loggedIn;
  }
}

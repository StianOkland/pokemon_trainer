import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Fetch stored state in localStorage. This state is used to determine if the user is logged in or not.
  // Used when user is typing in the url manually.
  constructor() { }
  loggedInStorage: string | null = localStorage.getItem('isLoggedIn')
  loggedIn: boolean | null = (this.loggedInStorage !== null)? JSON.parse(this.loggedInStorage) : null;

  // Set global and localStorage variable to true.
  setLogginTrue(): boolean {
    this.loggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(true))
    return this.loggedIn;
  }
  
  // Set global and localStorage variable to false.
  setLogginFalse(): boolean {
    this.loggedIn = false;
    localStorage.setItem('isLoggedIn', JSON.stringify(false))
    return this.loggedIn;
  }

  // Returns if user is logged in or not.
  isLoggedIn(): boolean {
    if (this.loggedIn === null){
      return false;
    }
    return this.loggedIn;
  }
}

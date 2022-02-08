import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  // Check if user is logged in. If so, redirect to catalogue-page.
  // If not logged in, redirect to landing page to log in.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn()) {
        if(state.url == '/') {
          this.router.navigate(['catalogue'])
        }
        return true;
      }
      else {
        this.router.navigate(['landing'])
        return false;
      }
  }
}

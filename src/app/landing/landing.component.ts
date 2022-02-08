import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerType } from '../models/trainer.model';
import { UserApiService } from '../services/user-api.service';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  storedUser: string | null = null
  storedState: string | null = null


  constructor(private readonly userAPIService: UserApiService, private router: Router, private auth: AuthService) { }


  ngOnInit(){
    // check localStorage to see if user is logged
    this.storedUser = localStorage.getItem('userData')
    this.storedState = localStorage.getItem('isLoggedIn')

    // loggedIn is in local storage -> update auth with its value
    if(this.storedState) {
      if(JSON.parse(this.storedState) == true) {
        this.auth.setLogginTrue()
      }
      else {
        this.auth.setLogginFalse()
      }
    }

    // navigate to catalogue if user is stored in localStorage AND logged in in auth guard
    if(this.auth.isLoggedIn()){
      if(this.storedUser) {
          this.router.navigate(['catalogue'])
      }
    }

  }

  attemptLogin(username: string){
    // checks if user exists, otherwise registers a new user

    this.userAPIService.fetchUserGivenUsername(username)
    .subscribe(
      (trainers) => {
        if (trainers[0]){
          // user exists 
          localStorage.setItem('userData', JSON.stringify(trainers[0]))
          this.auth.setLogginTrue()
          this.router.navigate(['catalogue'])
        }

        else {
          // user does not exist -> register new user
          this.userAPIService.registerNewUser(username)
          .subscribe(
            (newUser) => {
              localStorage.setItem('userData', JSON.stringify(newUser))
              this.auth.setLogginTrue()
              this.router.navigate(['catalogue'])
            },
            (error) => {
              console.error(error.message)
            }
          )
        }
      },
      (error) => {
        console.error(error.message)
      }
    )
  }
}

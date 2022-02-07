import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerType } from '../models/trainer.model';
import { UserApiService } from '../services/user-api.service';

import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser: TrainerType | undefined = undefined
  storedUser: string | null = null
  storedState: string | null = null


  constructor(private readonly userAPIService: UserApiService, private router: Router, private auth: AuthService) { }


  ngOnInit(){
    this.storedUser = localStorage.getItem('userData')
    this.storedState = localStorage.getItem('isLoggedIn')

    if(this.storedState) {
      if(JSON.parse(this.storedState) == true) {
        this.auth.setLogginTrue()
      }
      else {
        this.auth.setLogginFalse()
      }
    }

    // localStorage.removeItem('userData')
    console.log(this.auth.isLoggedIn())
    if(this.auth.isLoggedIn()){
      if(this.storedUser) {
          this.router.navigate(['trainer'])
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
          this.currentUser = trainers[0]
          localStorage.setItem('userData', JSON.stringify(this.currentUser))
          this.auth.setLogginTrue()
          this.router.navigate(['trainer'])
        }

        else {
          // user does not exist -> register new user
          this.userAPIService.registerNewUser(username)
          .subscribe(
            (newUser) => {
              this.currentUser = newUser as TrainerType
              localStorage.setItem('userData', JSON.stringify(this.currentUser))
              this.auth.setLogginTrue()
              this.router.navigate(['trainer'])
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerType } from '../models/trainer.model';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  currentUser: TrainerType | undefined = undefined
  storedUser: string | null = null

  constructor(private readonly userAPIService: UserApiService, private router: Router) { }


  ngOnInit(){
    this.storedUser = localStorage.getItem('userData')

    if (this.storedUser){
      this.router.navigate(['trainer'])
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
          this.router.navigate(['trainer'])
        }

        else {
          // user does not exist -> register new user
          this.userAPIService.registerNewUser(username)
          .subscribe(
            (newUser) => {
              this.currentUser = newUser as TrainerType
              localStorage.setItem('userData', JSON.stringify(this.currentUser))
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

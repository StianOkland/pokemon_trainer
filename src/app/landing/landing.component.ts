import { Component, OnInit } from '@angular/core';
import { TrainerType } from '../models/trainer.model';
import { UserApiService } from '../services/user-api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  currentUser: TrainerType | undefined = undefined

  constructor(private readonly userAPIService: UserApiService) { }

  attemptLogin(username: string){
    // checks if user exists, otherwise registers a new user

    this.userAPIService.fetchUserGivenUsername(username)
    .subscribe(
      (trainers) => {
        if (trainers[0]){
          // user exists 

          //TODO: store in localStorage & redirect
          this.currentUser = trainers[0]
        }
        else {
          // user does not exist -> register new user
          this.userAPIService.registerNewUser(username)
          .subscribe(
            (newUser) => {
              //TODO: store in localStorage & redirect
              this.currentUser = newUser as TrainerType
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

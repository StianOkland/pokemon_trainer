import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainerType } from '../models/trainer.model';

@Injectable({
  providedIn: 'root',
})

export class UserApiService {
  private _apiURL = 'https://trivia-vue-api.herokuapp.com';
  private _apiKey = 'Hr0Q8UeUONO66F3WZzW5wgmK0XFcE4GJwKL5kMwkG2y5MJ4XSNxOQvZZzWMxeOhk';
  private header = new HttpHeaders().set('X-API-Key', this._apiKey).set('Content-Type', 'application/json')

  constructor(private http: HttpClient) {}

  fetchUserGivenUsername(username: string): Observable<TrainerType[]> {
    // Fetches user given username. Result will be an array of TrainerType objects of users matching the username
    return this.http.get<TrainerType[]>(
      `${this._apiURL}/trainers?username=${username}`
    );
  }

  registerNewUser(username: string): Observable<Object>{
    // Registers a new user given username. Result will be the new user object

    let body = JSON.stringify({
      username: username,
      pokemon: [],
    });

    return this.http.post(`${this._apiURL}/trainers`, body, { 'headers': this.header })
  }

  updatePokemonList(userID: number, newPokemonArray: string[]): Observable<Object>{
    // Updates the array of Pokemons a user has given user ID. Result will be the new user object

    let body = JSON.stringify({
      pokemon: newPokemonArray
    });

    return this.http.patch(`${this._apiURL}/trainers/${userID}`, body, { 'headers': this.header })
  }
}

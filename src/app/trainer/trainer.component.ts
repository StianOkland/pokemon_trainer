import { Component, OnInit } from '@angular/core';
import { TrainerType } from '../models/trainer.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  // TODO: guard, check if in local storage
  // TODO: display pokemon image
  // TODO: remove pokemon from list
  // TODO: put pokemon in new object with IDs to make finding images easier

  constructor(private router: Router) { }

  private _currentUser :TrainerType | undefined = undefined

  checkStoredUser() {
    var storedUser :string | null = localStorage.getItem('userData')

    if (storedUser === null){
      localStorage.removeItem('userData')
      return undefined;
    }
    else {
      return JSON.parse(storedUser) as TrainerType;
    }
  }

  ngOnInit(): void {
    //todo: redirect if not logged in
    this._currentUser = this.checkStoredUser()
    if (!this._currentUser){
      this.router.navigate(['trainer'])
    }
    console.log(this._currentUser)
  }

  getUsername() {
    if (this._currentUser && this._currentUser.username !== undefined){
      return this._currentUser.username
    }
    else {
      return ''
    }
  }

  getUserID() {
    if (this._currentUser && this._currentUser.id !== undefined){
      return this._currentUser.id
    }
    else {
      return -1
    }
  }

  getPokemonList() {
    if (this._currentUser && this._currentUser.pokemon !== undefined){
      return this._currentUser.pokemon
    }
    else {
      return []
    }
  }

  getPokemonImageURL(pokemon: string){
    // TODO: get find ID of pokemon
    let id = 1
    console.log("finding image of: " + pokemon)
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  }

  deletePokemon(pokemon: string){
    console.log("deleting: " + pokemon)
    // TODO: update user in local storage and private
  }

  logout(){
    // TODO: remove user from local storage
    localStorage.removeItem('userData')
    console.log("logging out...")
    this.router.navigate(['trainer'])
  }
  
  toCatalogue() {
    this.router.navigate(['catalogue'])
  }
}

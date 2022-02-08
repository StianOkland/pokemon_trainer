import { Component, OnInit } from '@angular/core';
import { TrainerType } from '../models/trainer.model';
import { Router } from '@angular/router';
import { PokemonApiService } from '../services/pokemon-api.service';


@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  constructor(private router: Router, private readonly pokemonApiService: PokemonApiService) { }

  private _currentUser :TrainerType | undefined = undefined
  private _allPokemons : any = []

  ngOnInit(): void {
    this._currentUser = this.checkStoredUser()
    let storedPokemons = sessionStorage.getItem('pokemons')

    if (!this._currentUser){
      // user is not logged in -> move to landing page
      this.router.navigate(['landing'])
    }
    else {
      // make sure pokemons are stored in sessionStorage
      if(storedPokemons !== null){
        this._allPokemons = JSON.parse(storedPokemons)
      }
      else {
        this.pokemonApiService.fetchAllPokemons()
        .subscribe({
          next: (response) => {
            this._allPokemons = response.results;
            sessionStorage.setItem('pokemons', JSON.stringify(response.results))
          },
          error: (error) => {
            console.log(error.message)
          }
        })
      }
    }
  }

  checkStoredUser() {
    // checks whether user is stored in local storage
    // returns undefined if it's not present, otherwise returns the stored user
    var storedUser :string | null = localStorage.getItem('userData')

    if (storedUser === null){
      localStorage.removeItem('userData')
      return undefined;
    }
    else {
      return JSON.parse(storedUser) as TrainerType;
    }
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
    // given pokemon name, finds its ID and returns URL with image of the pokemon

    let pokemonObject = this._allPokemons.find(function (item: any) { return item.name === pokemon })
    let pokemonID = parseInt(pokemonObject.url.substring(34, pokemonObject.url.length - 1))

    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonID}.png`
  }

  deletePokemon(pokemon: string){
    // deletes a pokemon
    // only localStorage will reflect this change, not API
    let indexToDelete: number | undefined = this._currentUser?.pokemon.indexOf(pokemon)

    if (indexToDelete !== undefined && this._currentUser?.pokemon !== undefined){
      this._currentUser.pokemon.splice(indexToDelete, 1)
      localStorage.setItem('userData', JSON.stringify(this._currentUser))
    }
  }

  logout(){
    localStorage.removeItem('userData')
    localStorage.setItem('isLoggedIn',JSON.stringify(false))
    this.router.navigate(['landing'])
  }
  
  toCatalogue() {
    this.router.navigate(['catalogue'])
  }
}

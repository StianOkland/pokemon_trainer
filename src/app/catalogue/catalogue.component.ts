import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemons } from '../models/pokemon.model';
import { Router } from '@angular/router';
import { TrainerType } from '../models/trainer.model';
import { UserApiService } from '../services/user-api.service';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  pokemons: Pokemons | any = [];
  p: number | any = 0;
  storedUser: TrainerType = {username: '', pokemon: [], id: 0};


  constructor(private readonly userAPIService: UserApiService, private readonly pokemonAPIService: PokemonApiService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // sessionStorage.removeItem('pokemons')
    let storedPokemons = sessionStorage.getItem('pokemons')
    let storedUserStorage = localStorage.getItem('userData')
    
    if (!storedUserStorage){
      this.router.navigate(['landing'])
    }
    else {
      let tmp = JSON.parse(storedUserStorage)
      this.storedUser.username = tmp.username
      this.storedUser.id = tmp.id
      this.storedUser.pokemon = tmp.pokemon
    }


    if(storedPokemons !== null){
      this.pokemons.results = JSON.parse(storedPokemons)
    }
    else {
      this.pokemonAPIService.fetchAllPokemons()
      .subscribe({
        next: (response) => {
          console.log('RESPONSE', response)

          this.pokemons.results = response.results;
          sessionStorage.setItem('pokemons', JSON.stringify(response.results))
        },
        error: (error) => {
          console.log(error.message)
        }
      })
    }
  }


  onCatch(name: string) {
    // Add name to Pokemons in userprofile
    console.log('You got a', name)
    this.storedUser.pokemon.push(name)
    console.log('Updated user', this.storedUser)
    this.userAPIService.updatePokemonList(this.storedUser.id, this.storedUser.pokemon)
    .subscribe(
      () => {
        localStorage.setItem('userData', JSON.stringify(this.storedUser))
      }
    )
  }
}

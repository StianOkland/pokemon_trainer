import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pokemons } from '../models/pokemon.model';

const URL ='https://pokeapi.co/api/v2/pokemon?limit=1118';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  pokemons: Pokemons | any = [];
  p: number | any = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // sessionStorage.removeItem('pokemons')
    let storedPokemons = sessionStorage.getItem('pokemons')


    if(storedPokemons !== null){
      this.pokemons.results = JSON.parse(storedPokemons)
    }
    else {
      this.http.get<Pokemons>(URL)
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
  }
}

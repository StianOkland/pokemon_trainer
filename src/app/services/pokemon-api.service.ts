import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemons } from '../models/pokemon.model';


@Injectable({
    providedIn: 'root',
  })

export class PokemonApiService {
    private _apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=1118';

    constructor(private http: HttpClient) {}

    // Fetches all Pokemon's from pokeapi.
    fetchAllPokemons(): Observable<Pokemons> {
        return this.http.get<Pokemons>(
            `${this._apiURL}`
        )
    }
}
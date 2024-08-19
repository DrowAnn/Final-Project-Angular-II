import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonapiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) {}

  getPokemonsPage(pageIndex: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?offset=${pageIndex * 20}&limit=20/`);
  }

  getPokemonData(pokemonUrl: string) {
    return this.http.get(pokemonUrl);
  }
}

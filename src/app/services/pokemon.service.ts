import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {PokemonListItem} from '../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../shared/interface/pokemon-list-response';
import {PokemonDetails} from '../shared/interface/pokemon-details';
import {PokemonSpecies} from '../shared/interface/pokemon-species';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public url : string = "https://pokeapi.co/api/v2";
  public http: HttpClient  = inject(HttpClient)

  public async getAllPokemon(limit: number, offset: number): Promise<PokemonListResponse>{
    return lastValueFrom(this.http.get<PokemonListResponse>(`${this.url}/pokemon?limit=${limit}offset=${offset}`))
  }

  public async getByIdPokemon(value: string): Promise<PokemonDetails>{
    return lastValueFrom(this.http.get<PokemonDetails>(`${this.url}/pokemon/${value}`))
  }

  public async getSpeciesPokemon(value: string): Promise<PokemonSpecies>{
    return lastValueFrom(this.http.get<PokemonSpecies>(`${this.url}/pokemon-species/${value}`))
  }
}

import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {PokemonListItem} from '../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../shared/interface/pokemon-list-response';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {

  public url : string = "https://pokeapi.co/api/v2";
  public http: HttpClient  = inject(HttpClient)

  public async getAllPokemon(limit: number, offset: number): Promise<PokemonListResponse>{
    return lastValueFrom(this.http.get<PokemonListResponse>(`${this.url}/pokemon?limit=${limit}offset=${offset}`))
  }

  public async getByIdPokemon(value: string): Promise<PokemonListItem>{
    return lastValueFrom(this.http.get<PokemonListItem>(`${this.url}/pokemon/${value}`))
  }

  public async getSpeciesPokemon(value: string){
    return lastValueFrom(this.http.get(`${this.url}/pokemon-species/${value}`))
  }
}

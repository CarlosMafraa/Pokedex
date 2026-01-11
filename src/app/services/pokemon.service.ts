import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {PokemonListItem} from '../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../shared/interface/pokemon-list-response';
import {PokemonDetails} from '../shared/interface/pokemon-details';
import {PokemonSpecies} from '../shared/interface/pokemon-species';
import {CacheService} from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  public url : string = "https://pokeapi.co/api/v2";
  public http: HttpClient  = inject(HttpClient)
  private cache: CacheService = inject(CacheService)


  public async getAllPokemon(limit: number, offset: number): Promise<PokemonListResponse>{
    const cacheKey = `pokemon_list_${limit}_${offset}`;

    const cachedData = await this.cache.get<PokemonListResponse>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await lastValueFrom(
      this.http.get<PokemonListResponse>(`${this.url}/pokemon?limit=${limit}&offset=${offset}`)
    );

    await this.cache.set(cacheKey, response);
    return response;
  }

  public async getByIdPokemon(value: string): Promise<PokemonDetails>{
    const cacheKey = `pokemon_details_${value.toLowerCase()}`;

    const cachedData = await this.cache.get<PokemonDetails>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await lastValueFrom(
      this.http.get<PokemonDetails>(`${this.url}/pokemon/${value}`)
    );

    await this.cache.set(cacheKey, response);
    return response;
  }

  public async getSpeciesPokemon(value: string): Promise<PokemonSpecies>{
    const cacheKey = `pokemon_species_${value.toLowerCase()}`;

    const cachedData = await this.cache.get<PokemonSpecies>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await lastValueFrom(
      this.http.get<PokemonSpecies>(`${this.url}/pokemon-species/${value}`)
    );

    await this.cache.set(cacheKey, response);
    return response;
  }

  public clearCache(): void {
    this.cache.clearAll();
  }
}

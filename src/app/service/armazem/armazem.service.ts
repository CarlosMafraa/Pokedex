import { Injectable } from '@angular/core';
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArmazemService {
  public url : string = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) { }

  public async getByIdPokemon(value: any): Promise<any>{
    const api = this.http.get(`${this.url}/pokemon/${value}`);
    return lastValueFrom(api);
  }

  public async getAllPokemon(limit: number, offset: number): Promise<any>{
    const api = this.http.get(`${this.url}/pokemon?limit=${limit}&offset=${offset}`);
    return lastValueFrom(api);
  }
  public async getSpeciesPokemon(value: any): Promise<any>{
    const api = this.http.get(`${this.url}/pokemon-species/${value}`);
    return lastValueFrom(api);
  }
}

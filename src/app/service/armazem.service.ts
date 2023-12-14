import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArmazemService {
  public url : string = "https://pokeapi.co/api/v2";

  constructor(private http: HttpClient) { }

  public getByIdPokemon(value: any): Observable<any>{
    console.log(value)
    return this.http.get(`${this.url}/pokemon/${value}`);
  }

  public getAllPokemon(limit: number, offset: number): Observable<any>{
    console.log(limit, offset)
    return this.http.get(`${this.url}/pokemon?limit=${limit}&offset=${offset}`);
  }
}

import {Component, OnInit} from '@angular/core';
import {ArmazemService} from "../../service/armazem.service";
import {PokemonList} from "../../shared/interface/pokemon-list";
import {Pokemon} from "../../shared/interface/pokemon";
@Component({
  selector: 'app-listagem-pokedex',
  templateUrl: './listagem-pokedex.component.html',
  styleUrl: './listagem-pokedex.component.css'
})
export class ListagemPokedexComponent implements OnInit{
  public pokemonsAll: Array<PokemonList> = new Array<PokemonList>()
  public limit: number = 52;
  public inicial: number = 0;
  public currentPage: number = 0;
  public isLoading: boolean = false;
  public pokemon!: Pokemon;
  public pokemonsDetails: Array<Pokemon> = new Array<Pokemon>();
  public searchResults: Array<Pokemon> = new Array<Pokemon>();
  public value: any = null;

  constructor(
    private armazem: ArmazemService,
   ) { }

  ngOnInit() {
    this.searchPokemon(this.value);
    console.log("Oii")

  }

  public getAllPokemons(value: number){
    if(value !=0 || null){
      this.inicial = this.limit * value;
    }
    this.pokemonsDetails = [];
    this.armazem.getAllPokemon(this.limit, this.inicial).subscribe({
      next: res => {
        this.isLoading = true;
        this.pokemonsAll = res.results;
        this.pokemonsAll.forEach(yes =>{
          this.getByPokemons(yes.name);
        })
        this.isLoading = false;
      }, error: error => {
        console.error('Deu ruim: ', error);
      }
    })
  }
  public searchPokemon(value: any) {
    if (value != null) {
      console.log(value)
      this.getByPokemons(value, true)
      console.log("Olaaaa")
    } else {
      this.getAllPokemons(this.currentPage);
      console.log("Oiii")
    }
  }

  public getByPokemons(value: any, isSearch: boolean = false) {
    this.armazem.getByIdPokemon(value).subscribe({
      next: res => {
        this.isLoading = true;
        let pokemonDetails : Pokemon = {
          id: res.id,
          name: res.name,
          Arraytipo: res.types,
          imageGif : res.sprites.versions['generation-v']['black-white'].animated['front_default'],
        };
        if (isSearch) {
          this.searchResults = [pokemonDetails];
        } else {
          this.pokemonsDetails.push(pokemonDetails);
        }
        this.isLoading = false;
      }, error: error => {
        console.error('Deu ruim: ', error);
      }
    })
  }

  public previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllPokemons(this.currentPage);
    }
  }

  public nextPage() {
    this.currentPage++;
    this.getAllPokemons(this.currentPage);
  }
}

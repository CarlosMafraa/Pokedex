import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArmazemService} from "../../service/armazem/armazem.service";
import {PokemonList} from "../../shared/interface/pokemon-list";
import {Pokemon} from "../../shared/interface/pokemon";
import {FormControl} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-listagem-pokedex',
  templateUrl: './listagem-pokedex.component.html',
  styleUrl: './listagem-pokedex.component.css',
})
export class ListagemPokedexComponent implements OnChanges{
  @Input() public currentPage!: number;

  public pokemonsAll: Array<PokemonList> = new Array<PokemonList>()
  public limit: number = 28;
  public inicial: number = 0;
  public isLoading: boolean = false;
  public pokemonsDetails: Array<Pokemon> = new Array<Pokemon>();
  public searchResults: Array<Pokemon> = new Array<Pokemon>();
  public value: any = null;
  public pokemonSelecionado: any;
  public details: boolean = false;
  public pokemonSelecionadoAnterior = null;

  constructor(
    private armazem: ArmazemService,
  ) { }

  ngOnChanges() {
    this.searchPokemon(this.value);
  }

  public async getAllPokemons(value: number){
    this.searchResults = [];
    if(value !== 0){
      this.inicial = this.limit * value;
    } else {
      this.inicial = value;
    }
    this.pokemonsDetails = [];
    this.changeLoading(true);
    try {
      const res = await this.armazem.getAllPokemon(this.limit, this.inicial);
      this.pokemonsAll = res.results;
      await Promise.all(this.pokemonsAll.map(pokemon => this.getByPokemons(pokemon.name)));
      this.changeLoading(false);
    } catch (error) {
      this.changeLoading(false);
    }
  }


  public searchPokemon(value: any) {
    if (value !== null && value !== '') {
      this.getByPokemons(value, true)
    } else {
      this.getAllPokemons(this.currentPage);
    }
  }

  public getByPokemons(value: any, isSearch: boolean = false) {
    this.scrollTop();
    this.changeLoading(true);
    this.armazem.getByIdPokemon(value).then( res => {
        let pokemonDetails : Pokemon = {
          id: res.id,
          name: res.name,
          Arraytipo: res.types,
          image: res.sprites.front_default,
          imageGif : res.sprites.versions['generation-v']['black-white'].animated['front_default'],
          peso: res.weight,
          altura: res.height,
          habilidades: res.abilities
        };
        if (isSearch) {
          this.searchResults = [pokemonDetails];
        } else {
          this.pokemonsDetails.push(pokemonDetails);
        }
        this.changeLoading(false);
      }).catch(()=>{
      this.changeLoading(false);
    })
  }

  public onTextChange(formControl: FormControl) {
    this.value = formControl.value;
    this.searchPokemon(this.value);
    this.details = false;
  }
  public changeLoading(event: boolean){
    this.isLoading = event;
  }

  public scrollTop(): void{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  public detailsMetod(value: any) {
    this.scrollTop();

    if (this.pokemonSelecionadoAnterior === value) {
      this.details = !this.details;
    } else {
      this.details = true;
      this.pokemonSelecionado = value;
    }
    this.pokemonSelecionadoAnterior = value;
  }

}

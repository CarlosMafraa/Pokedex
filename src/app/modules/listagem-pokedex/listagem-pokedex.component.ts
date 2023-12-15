import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ArmazemService} from "../../service/armazem/armazem.service";
import {PokemonList} from "../../shared/interface/pokemon-list";
import {Pokemon} from "../../shared/interface/pokemon";
import {FormControl} from "@angular/forms";
import {abrirFechar} from "../../shared/animacao/animacao";
@Component({
  selector: 'app-listagem-pokedex',
  templateUrl: './listagem-pokedex.component.html',
  styleUrl: './listagem-pokedex.component.css',
  animations: [ abrirFechar ],
})
export class ListagemPokedexComponent implements OnInit, OnChanges{
  @Input() public currentPage!: number;

  public pokemonsAll: Array<PokemonList> = new Array<PokemonList>()
  public limit: number = 28;
  public inicial: number = 0;
  public isLoading: boolean = false;
  public pokemonsDetails: Array<Pokemon> = new Array<Pokemon>();
  public searchResults: Array<Pokemon> = new Array<Pokemon>();
  public value: any = null;
  public pokemonSelecionado: any;
  public estado = 'invisivel';

  constructor(
    private armazem: ArmazemService,
  ) { }

  ngOnChanges() {
    this.searchPokemon(this.value);
  }

  ngOnInit() {

  }

  public getAllPokemons(value: number){
    this.changeLoading(true);
    this.searchResults = [];
    if(value !== 0){
      this.inicial = this.limit * value;
    } else {
      this.inicial = value;
    }
    this.pokemonsDetails = [];
    this.armazem.getAllPokemon(this.limit, this.inicial).subscribe({
      next: res => {
        this.pokemonsAll = res.results;
        this.pokemonsAll.forEach(yes =>{
          this.getByPokemons(yes.name);
          this.changeLoading(false);
        })
      }, error: error => {
        console.error('Deu ruim: ', error);
      }
    })
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
    this.armazem.getByIdPokemon(value).subscribe({
      next: res => {
        this.isLoading = true;
      console.log(res)
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
      }, error: error => {
        console.error('Deu ruim: ', error);
      }
    })
  }

  public onTextChange(formControl: FormControl) {
    this.value = formControl.value;
    this.searchPokemon(this.value);
  }
  public changeLoading(event: boolean){
    this.isLoading = event;
  }

  public scrollTop(): void{
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  public detailsMetod(value: any) {
    console.log(value, "O que eu quero");
    if (this.pokemonSelecionado === value && this.estado === 'aberto') {
      this.estado = 'fechado';
    } else {
      this.pokemonSelecionado = value;
      this.estado = 'aberto';
    }
  }

}

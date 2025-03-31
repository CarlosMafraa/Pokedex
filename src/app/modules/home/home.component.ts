import {Component, inject, OnInit} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../../shared/interface/pokemon-list-response';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public pokemons: PokemonListItem[] = [];
  public service: PokemonService = inject(PokemonService)

  ngOnInit() {
    this.getAllPokemons();
  }

  public getAllPokemons(){
    this.service.getAllPokemon(20,20).then((res: PokemonListResponse) => {
      this.pokemons = res.results
    })
  }

}

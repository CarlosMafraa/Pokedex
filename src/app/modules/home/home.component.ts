import {Component, inject, OnInit} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../../shared/interface/pokemon-list-response';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {PokemonDetails} from '../../shared/interface/pokemon-details';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    Button,
    InputGroup,
    InputText
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public pokemons: PokemonListItem[] = [];
  public service: PokemonService = inject(PokemonService)
  public pokemon: string = "";

  ngOnInit() {
    this.getAllPokemons().then();
  }

  public async getAllPokemons() {
    await this.service.getAllPokemon(151, 0).then((res: PokemonListResponse) => {
      this.pokemons = res.results
    })
  }

  public async buscar() {
    if (this.pokemon.trim()) {
      try {
        const pokemonDetails: PokemonDetails = await this.service.getByIdPokemon(this.pokemon.toLowerCase());
        this.pokemons = [pokemonDetails.species]
      } catch (error) {
        console.error('Pokémon não encontrado:', error);
        this.pokemons = [];
      }
    } else {
      this.getAllPokemons().then();
    }

  }
}

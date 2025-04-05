import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonListResponse} from '../../shared/interface/pokemon-list-response';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {InputGroup} from 'primeng/inputgroup';
import {InputText} from 'primeng/inputtext';
import {PokemonDetails} from '../../shared/interface/pokemon-details';
import {LoadingComponent} from '../../shared/modules/loading/loading.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    FormsModule,
    Button,
    InputGroup,
    InputText,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public pokemons: WritableSignal<PokemonListItem[]> = signal<PokemonListItem[]>([]) ;
  public pokemon: WritableSignal<string> = signal<string>("");
  public service: PokemonService = inject(PokemonService)

  ngOnInit() {
    this.getAllPokemons().then();
  }

  public async getAllPokemons() {
    await this.service.getAllPokemon(151, 0).then((res: PokemonListResponse) => {
      this.pokemons.set(res.results)
    }).catch(() => {

    }).finally(() => {

    })
  }

  public async buscar() {
    if (this.pokemon().trim()) {
      try {
        const pokemonDetails: PokemonDetails = await this.service.getByIdPokemon(this.pokemon());
        this.pokemons.set([pokemonDetails.species]);
      } catch (error) {
        console.error('Pokémon não encontrado:', error);
        this.pokemons.set([]);
      }
    } else {
      this.getAllPokemons().then();
    }
  }

}

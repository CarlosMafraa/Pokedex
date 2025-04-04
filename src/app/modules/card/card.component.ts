import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonDetails} from '../../shared/interface/pokemon-details';
import {CommonModule} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    DialogComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  public pokemon: InputSignal<PokemonListItem> = input.required<PokemonListItem>()
  public service: PokemonService = inject(PokemonService)
  public detailsPokemon!: PokemonDetails;
  public currentSprite: string = "";
  public visible: boolean = false;

  async ngOnInit() {
    try {
      await this.getByName(this.pokemon().name);
      this.currentSprite = this.detailsPokemon.sprites.front_default;
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error);
    }
  }

  public async getByName(value: string) {
    const res: PokemonDetails = await this.service.getByIdPokemon(value);
    this.detailsPokemon = res;
    console.log(res);
  }

  showAnimatedSprite() {
    this.currentSprite = this.detailsPokemon.sprites.versions['generation-v']['black-white'].animated.front_default || this.detailsPokemon.sprites.front_default;
  }

  showStaticSprite() {
    this.currentSprite = this.detailsPokemon.sprites.front_default;
  }

  public details() {
    this.visible = true;
  }
}

import {Component, inject, input, InputSignal, model, ModelSignal, OnInit, signal, WritableSignal} from '@angular/core';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonDetails} from '../../shared/interface/pokemon-details';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {LoadingComponent} from '../../shared/modules/loading/loading.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    Dialog,
    DialogComponent,
    LoadingComponent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  public pokemon: InputSignal<PokemonListItem> = input.required<PokemonListItem>()
  public service: PokemonService = inject(PokemonService)
  public detailsPokemon: WritableSignal<PokemonDetails | undefined> = signal<PokemonDetails | undefined>(undefined);
  public staticSprite: WritableSignal<string> = signal<string>("");
  public animatedSprite: WritableSignal<string> = signal<string>("");
  public showAnimated: WritableSignal<boolean> = signal<boolean>(false);
  public visible: ModelSignal<boolean> = model(false)

  async ngOnInit() {
    try {
      await this.getByName(this.pokemon().name);
      // Pré-carrega ambas as imagens
      this.staticSprite.set(this.detailsPokemon()?.sprites.front_default || '');
      this.animatedSprite.set(
        this.detailsPokemon()?.sprites.versions['generation-v']['black-white'].animated.front_default
        || this.detailsPokemon()?.sprites.front_default
        || ''
      );
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error);
    }
  }

  public async getByName(value: string) {
    const res: PokemonDetails = await this.service.getByIdPokemon(value);
    this.detailsPokemon.set(res);
  }

  showAnimatedSprite() {
    this.showAnimated.set(true);
  }

  showStaticSprite() {
    this.showAnimated.set(false);
  }

  public details() {
    this.visible.set(true);
  }
}

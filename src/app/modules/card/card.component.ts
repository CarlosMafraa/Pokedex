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
  public currentSprite: WritableSignal<string> = signal<string>("");
  public visible: ModelSignal<boolean> = model(false);
  public spriteUrl: WritableSignal<string> = signal('')

  async ngOnInit() {
    try {
      const res: PokemonDetails = await this.service.getByIdPokemon(this.pokemon().name);
      this.detailsPokemon.set(res);

      const initialSprite = res.sprites.front_default || '';
      this.spriteUrl.set(initialSprite);
      this.currentSprite.set(initialSprite);
    } catch (error) {
      console.error('Erro ao carregar Pokémon:', error);
    }
  }

  public showAnimatedSprite() {
    const details = this.detailsPokemon();
    if (details) {
      const animated = details.sprites.versions['generation-v']?.['black-white']?.animated?.front_default;
      const fallback = details.sprites.front_default || '';
      this.currentSprite.set(animated || fallback);
    }
  }

  showStaticSprite() {
    const details = this.detailsPokemon();
    if (details) {
      this.currentSprite.set(details.sprites.front_default || '');
    }
  }

  public details() {
    this.visible.set(true);
  }
}

import {Component, inject, input, InputSignal, OnInit} from '@angular/core';
import {PokemonListItem} from '../../shared/interface/pokemon-list-item';
import {PokemonService} from '../../services/pokemon.service';
import {PokemonDetails} from '../../shared/interface/pokemon-details';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  public pokemon: InputSignal<PokemonListItem> = input.required<PokemonListItem>()
  public service: PokemonService = inject(PokemonService)
  public detailsPokemon!: PokemonDetails;

  ngOnInit() {
    this.getByName(this.pokemon().name);
  }

  public getByName(value: string | undefined) {
    if (value) {
      this.service.getByIdPokemon(value).then((res: PokemonDetails) => {
        if(res){
          this.detailsPokemon = res;
          console.log(res)
        }
      })
    }
  }

}

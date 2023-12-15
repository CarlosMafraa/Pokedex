import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card-pokedex',
  templateUrl: './card-pokedex.component.html',
  styleUrl: './card-pokedex.component.css'
})
export class CardPokedexComponent {
  @Input() pokemon!: any;

}

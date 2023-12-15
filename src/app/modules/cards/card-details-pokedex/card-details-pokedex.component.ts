import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Pokemon} from "../../../shared/interface/pokemon";

@Component({
  selector: 'app-card-details-pokedex',
  templateUrl: './card-details-pokedex.component.html',
  styleUrl: './card-details-pokedex.component.css'
})
export class CardDetailsPokedexComponent implements OnChanges{
  @Input() pokemon!: any;

  constructor() {
  }

  ngOnChanges() {
    if(this.pokemon !== undefined){
      console.log(this.pokemon.name)

    }
  }

}

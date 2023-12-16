import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Pokemon, Specie} from "../../../shared/interface/pokemon";
import {ArmazemService} from "../../../service/armazem/armazem.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-card-details-pokedex',
  templateUrl: './card-details-pokedex.component.html',
  styleUrl: './card-details-pokedex.component.css'
})
export class CardDetailsPokedexComponent implements OnChanges{
  @Input() pokemon!: any;
  public especie!: Specie;

  constructor(public armazem: ArmazemService) {

  }

  ngOnChanges() {
    if(this.pokemon !== undefined){
      this.armazem.getSpeciesPokemon(this.pokemon.name).then(res => {
        let pokemonSpecie: Specie = {
          categoria: res['genera'][7]['genus'],
          cor: res.color.name,
          forma: res.shape.name
        }
        this.especie = pokemonSpecie;
      })
    }
  }

}

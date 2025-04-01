import {PokemonListItem} from './pokemon-list-item';
import {PokemonSprites} from './pokemon-sprites';
import {PokemonAbility} from './pokemon-ability';
import {PokemonStat} from './pokemon-stat';
import {PokemonType} from './pokemon-type';

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  species: PokemonListItem;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  types: PokemonType[];
}

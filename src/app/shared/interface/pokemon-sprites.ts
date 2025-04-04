export interface PokemonSprites {
  front_default: string;
  back_default: string;
  versions: {
    'generation-v': {
      'black-white': {
        animated: {
          front_default: string | null;
          back_default: string | null;
        };
      };
    };
  };
}

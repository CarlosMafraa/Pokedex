export interface Pokemon {
  id: string;
  name: string;
  Arraytipo: Array<Type>
  image?: string;
  imageGif?: string;
  habilidades: string;
  altura: string;
  peso: string;
}

export interface Type{
  name: string,
  url: string
}

export interface Specie{
  categoria: string;
  forma: string;
  cor: string;
}

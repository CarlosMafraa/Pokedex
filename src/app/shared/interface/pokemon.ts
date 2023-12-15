export interface Pokemon {
  id: string;
  name: string;
  Arraytipo: Array<Type>
  image?: string;
  imageGif: string;
  altura?: string;
  peso?: string;
  categoria?: string;
  habilidades?: string;
}

export interface Type{
  name: string,
  url: string
}

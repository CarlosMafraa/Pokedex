export interface Pokemon {
  id: string;
  name: string;
  Arraytipo: Array<Type>
  imageGif: string;
}

export interface Type{
  name: string,
  url: string
}

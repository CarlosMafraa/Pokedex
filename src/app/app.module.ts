import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {CardPokedexComponent} from "./modules/card-pokedex/card-pokedex.component";
import {ListagemPokedexComponent} from "./modules/listagem-pokedex/listagem-pokedex.component";
import {FormPokedexComponent} from "./modules/form-pokedex/form-pokedex.component";

@NgModule({
  declarations: [
    AppComponent,
    CardPokedexComponent,
    ListagemPokedexComponent,
    FormPokedexComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {CardPokedexComponent} from "./modules/card-pokedex/card-pokedex.component";
import {ListagemPokedexComponent} from "./modules/listagem-pokedex/listagem-pokedex.component";
import {FormPokedexComponent} from "./modules/form-pokedex/form-pokedex.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CardPokedexComponent,
    ListagemPokedexComponent,
    FormPokedexComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

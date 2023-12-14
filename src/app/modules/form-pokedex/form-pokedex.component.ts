import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-form-pokedex',
  templateUrl: './form-pokedex.component.html',
  styleUrl: './form-pokedex.component.css'
})
export class FormPokedexComponent{
  @Output() onValueChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  public form: FormControl = new FormControl<string>('');

  public emitControl() {
    this.onValueChange.emit(this.form);
  }
}

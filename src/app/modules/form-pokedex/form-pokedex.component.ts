import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-pokedex',
  templateUrl: './form-pokedex.component.html',
  styleUrl: './form-pokedex.component.css'
})
export class FormPokedexComponent implements OnInit{
  public formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
  }
  ngOnInit() {
    this.initFormGroup()
  }
  public initFormGroup(){
    this.formGroup = this.formBuilder.group({
      valor:['', Validators.required]
    })
  }

}

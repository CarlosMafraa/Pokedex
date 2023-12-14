import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPokedexComponent } from './listagem-pokedex.component';

describe('ListagemPokedexComponent', () => {
  let component: ListagemPokedexComponent;
  let fixture: ComponentFixture<ListagemPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemPokedexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListagemPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

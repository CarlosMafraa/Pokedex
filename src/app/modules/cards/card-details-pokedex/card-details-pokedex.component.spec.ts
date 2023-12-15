import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailsPokedexComponent } from './card-details-pokedex.component';

describe('CardDetailsPokedexComponent', () => {
  let component: CardDetailsPokedexComponent;
  let fixture: ComponentFixture<CardDetailsPokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailsPokedexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailsPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

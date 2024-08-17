import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCharactersComponent } from './pokemon-characters.component';

describe('PokemonCharactersComponent', () => {
  let component: PokemonCharactersComponent;
  let fixture: ComponentFixture<PokemonCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCharactersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

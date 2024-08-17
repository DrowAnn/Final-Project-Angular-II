import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAppComponent } from './pokemon-app.component';

describe('PokemonAppComponent', () => {
  let component: PokemonAppComponent;
  let fixture: ComponentFixture<PokemonAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

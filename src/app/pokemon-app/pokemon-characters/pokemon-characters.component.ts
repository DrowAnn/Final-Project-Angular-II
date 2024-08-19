import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonapiService } from '../../services/pokemonapi.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { Pokemon, PokemonsPage } from '../../interfaces/pokemon';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { CardsComponent } from '../components/cards/cards.component';

@Component({
  selector: 'app-pokemon-characters',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    PaginatorComponent,
    CardsComponent,
  ],
  providers: [PokemonapiService],
  templateUrl: './pokemon-characters.component.html',
  styleUrl: './pokemon-characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonCharactersComponent implements OnInit {
  pokemonPageNumber = signal<number>(0);
  loading = signal<boolean>(false);
  pokemonsPage = signal<PokemonsPage>({} as PokemonsPage);
  constructor(private pokemonapiService: PokemonapiService) {}

  ngOnInit(): void {
    this.loadPokemonData();
  }

  loadPokemonData() {
    if (this.pokemonPageNumber() >= 0) {
      this.loading.set(true);
      this.pokemonapiService
        .getPokemonsPage(this.pokemonPageNumber())
        .subscribe({
          next: (pokemonsList: PokemonsPage) => {
            this.pokemonsPage.set(pokemonsList);
            this.loading.set(false);
          },
          error: (err: any) => {
            console.log(err);
            this.loading.set(false);
          },
        });
    } else {
      console.log('Sin datos');
    }
  }

  updateNameOrId(indexPage: number) {
    this.pokemonPageNumber.set(indexPage);
    this.loadPokemonData();
  }
}

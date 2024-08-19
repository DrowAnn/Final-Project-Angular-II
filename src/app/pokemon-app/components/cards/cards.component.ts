import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PokemonapiService } from '../../../services/pokemonapi.service';
import { Pokemon } from '../../../interfaces/pokemon';
import { MatDialog } from '@angular/material/dialog';
import { FloatingDialogComponent } from '../floating-dialog/floating-dialog.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FloatingDialogComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit {
  @Input() pokemonUrl: string = '';
  pokemonDataObject = signal<Pokemon>({} as Pokemon);
  loading = signal<boolean>(true);
  imageCard = signal<string>('');

  constructor(
    private pokemonapiService: PokemonapiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.pokemonapiService.getPokemonData(this.pokemonUrl).subscribe({
      next: (pokemonData: any) => {
        this.pokemonDataObject.set(pokemonData);
        this.imageCard.set(this.pokemonDataObject().sprites.front_default);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  openDetails() {
    this.dialog.open(FloatingDialogComponent, { data: this.pokemonUrl });
  }
}

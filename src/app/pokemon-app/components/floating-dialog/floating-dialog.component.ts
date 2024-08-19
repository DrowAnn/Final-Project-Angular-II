import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Pokemon } from '../../../interfaces/pokemon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PokemonapiService } from '../../../services/pokemonapi.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-floating-dialog',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinner, MatButtonModule, MatDialogClose],
  templateUrl: './floating-dialog.component.html',
  styleUrl: './floating-dialog.component.scss',
})
export class FloatingDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private pokemonUrl: string,
    private pokemonapiService: PokemonapiService
  ) {}
  pokemonExtractedData = signal<Pokemon>({} as Pokemon);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.pokemonapiService.getPokemonData(this.pokemonUrl).subscribe({
      next: (pokemonData: any) => {
        this.pokemonExtractedData.set(pokemonData);
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
}

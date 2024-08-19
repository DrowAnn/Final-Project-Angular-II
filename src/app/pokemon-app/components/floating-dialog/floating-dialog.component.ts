import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) private pokemonUrl: string,
    private pokemonapiService: PokemonapiService
  ) {
    effect(() => {
      if (this.animating()) {
        this.animateFrames();
      }
    });
  }

  pokemonExtractedData = signal<Pokemon>({} as Pokemon);
  loading = signal<boolean>(true);
  animationArray = signal<string[]>([]);
  animating = signal(false);
  actualIndex = signal(0);
  sound = signal('');

  playSound() {
    const audio = new Audio();
    audio.src =
      this.sound() != null
        ? this.sound()
        : 'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/25.ogg';
    console.log(this.sound());
    audio.load();
    audio.play();
  }

  actualImage = computed(() => {
    const array = this.animationArray();
    return array.length > 0 ? array[this.actualIndex()] : '';
  });

  startAnimation() {
    this.actualIndex.set(0);
    this.animating.set(true);
  }

  stopAnimation() {
    this.animating.set(false);
  }

  animateFrames() {
    setTimeout(() => {
      if (this.animating() && this.animationArray()[1] != null) {
        this.actualIndex.update((index) => (index + 1) % 2);
        this.animateFrames();
      }
    }, 300);
  }

  animateCard() {
    this.playSound();
    this.startAnimation();
  }

  capitalize(str: string) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  ngOnInit(): void {
    this.pokemonapiService.getPokemonData(this.pokemonUrl).subscribe({
      next: (pokemonData: any) => {
        this.pokemonExtractedData.set(pokemonData);
        //The Timeout was used to see the spinner animation
        setTimeout(() => {
          this.sound.set(this.pokemonExtractedData().cries.latest);
          this.animationArray.set([
            this.pokemonExtractedData().sprites.front_default,
            this.pokemonExtractedData().sprites.back_default,
          ]);
          this.loading.set(false);
          this.animateCard();
        }, 500);
      },
      error: (err: any) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-app',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pokemon-app.component.html',
  styleUrl: './pokemon-app.component.scss',
})
export class PokemonAppComponent {}

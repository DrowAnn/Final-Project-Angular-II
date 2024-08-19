import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { PokemonapiService } from '../../../services/pokemonapi.service';
import { PokemonsPage } from '../../../interfaces/pokemon';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {
  constructor(private pokemonapiService: PokemonapiService) {}

  length = signal<number>(0);
  pageSize = signal<number>(0);
  pageIndex = signal<number>(0);
  hidePageSize = signal<boolean>(false);
  showFirstLastButtons = signal<boolean>(true);
  disabled = signal<boolean>(false);

  ngOnInit(): void {
    this.pokemonapiService.getPokemonsPage(this.pageIndex()).subscribe({
      next: (pokemonsList: PokemonsPage) => {
        this.length.set(pokemonsList.count);
        this.pageSize.set(pokemonsList.results.length);
      },
    });
  }

  @Output() emisor = new EventEmitter<number>();

  pageEvent: PageEvent = new PageEvent();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length.set(e.length);
    this.pageSize.set(e.pageSize);
    this.pageIndex.set(e.pageIndex);
    this.emisor.emit(e.pageIndex);
  }
}

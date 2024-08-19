import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { PokemonapiService } from '../../../services/pokemonapi.service';
import { PokemonsPage } from '../../../interfaces/pokemon';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent implements OnInit {
  constructor(private pokemonapiService: PokemonapiService) {}

  length = 0;
  pageSize = 0;
  pageIndex = 0;
  hidePageSize = false;
  showFirstLastButtons = true;
  disabled = false;

  ngOnInit(): void {
    this.pokemonapiService.getPokemonsPage(this.pageIndex).subscribe({
      next: (pokemonsList: PokemonsPage) => {
        this.length = pokemonsList.count;
        this.pageSize = pokemonsList.results.length;
      },
    });
  }

  @Output() emisor = new EventEmitter<number>();

  pageEvent: PageEvent = new PageEvent();

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.emisor.emit(e.pageIndex);
  }
}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IBook } from '../../interfaces/IBook.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BooksCatalogService } from '../../services/books-catalog.service';

@Component({
  selector: 'app-books-catalog',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './books-catalog.component.html',
  styleUrl: './books-catalog.component.css',
})
export class BooksCatalogComponent {
  booksList: IBook[] = [];

  amount: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksCatalogService: BooksCatalogService
  ) {
    const $booksList = this.booksCatalogService.getAll();

    $booksList.subscribe((data: IBook[]) => {
      this.booksList = data;

      this.amount =
        activatedRoute.snapshot.queryParams['amount'] || this.booksList.length;

      this.booksList = this.booksList.filter(
        (_: IBook, index: number) => index < this.amount
      );
    });
  }

  getBookUpdateRoute(book: IBook) {
    return `/books/update/${book._id}`;
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IBook } from '../../interfaces/IBook.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { BooksCatalogService } from '../../services/books-catalog.service';

@Component({
  selector: 'app-books-update',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './books-update.component.html',
  styleUrl: './books-update.component.css',
})
export class BooksUpdateComponent {
  private bookId: string;

  bookToUpdate: IBook;
  bookForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksCatalogService: BooksCatalogService
  ) {
    // this.bookId = '1';
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.bookToUpdate = this.booksCatalogService.getOne(this.bookId);

    this.bookForm = new FormGroup({
      title: new FormControl(this.bookToUpdate.title || 'Titulo Padrão'),
      author: new FormControl(this.bookToUpdate.author || 'Nome do Autor'),
      description: new FormControl(this.bookToUpdate.description),
      published_date: new FormControl(this.bookToUpdate.publishedDate),
      price: new FormControl(this.bookToUpdate.price),
      totalInStock: new FormControl(this.bookToUpdate.totalInStock),
    });
  }

  submitForm() {
    let bookData = this.bookForm.value;

    this.booksCatalogService.updateOne(this.bookId, bookData);
  }
}

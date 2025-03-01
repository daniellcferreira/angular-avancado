import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  styleUrls: ['./books-update.component.css'],
})
export class BooksUpdateComponent {
  private bookId: string;
  bookToUpdate: IBook;
  bookForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksCatalogService: BooksCatalogService
  ) {
    this.bookId = this.activatedRoute.snapshot.params['id'];
    this.bookToUpdate = this.booksCatalogService.getOne(this.bookId);

    this.bookForm = new FormGroup({
      title: new FormControl(this.bookToUpdate.title || 'Titulo Padrão', [
        Validators.required,
      ]),
      author: new FormControl(this.bookToUpdate.author || 'Nome do Autor', [
        Validators.required,
      ]),
      description: new FormControl(this.bookToUpdate.description),
      published_date: new FormControl(this.bookToUpdate.publishedDate, [
        Validators.required,
      ]),
      price: new FormControl(this.bookToUpdate.price, [
        Validators.required,
        Validators.min(0),
      ]),
      totalInStock: new FormControl(this.bookToUpdate.totalInStock, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  submitForm() {
    if (this.bookForm.valid) {
      let bookData = this.bookForm.value;
      this.booksCatalogService.updateOne(this.bookId, bookData);
    } else {
      console.log('Formulário inválido');
    }
  }
}

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBook } from '../../interfaces/IBook.interface';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-books-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.css'],
})
export class BooksCreateComponent {
  booksList: IBook[] = [
    {
      _id: '550e8400-e29b-41d4-a716-446655440000',
      catalog_id: 'A001',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel set in the Jazz Age',
      publishedDate: new Date('1925-04-10'),
      imageLink:
        'https://m.media-amazon.com/images/I/61cnHV26bOL._AC_UL320_.jpg',
      price: 10.99,
      totalInStock: 30,
      totalAddedToCart: 0,
    },
  ];
  bookForm: FormGroup;

  constructor(private router: Router) {
    this.bookForm = new FormGroup({
      title: new FormControl('Titulo Padrão', Validators.required),
      author: new FormControl('Nome do Autor', Validators.required),
      description: new FormControl('', Validators.required),
      published_date: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      totalInStock: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  submitForm() {
    if (this.bookForm.valid) {
      let bookData = this.bookForm.value;
      this.booksList.push(bookData);
      this.router.navigate(['books']);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}

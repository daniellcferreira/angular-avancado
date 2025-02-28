import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup } from '@angular/forms';
import { IBook } from '../../interfaces/IBook.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-books-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './books-create.component.html',
  styleUrl: './books-create.component.css',
})
export class BooksCreateComponent {
  booksList: IBook[] = [
    {
      _id: '550e8400-e29b-41d4-a716-446655440000',
      catalog_id: 'A001',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel ste int the Jazz Age',
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
      title: new FormControl('Titulo Padrão'),
      author: new FormControl('Nome do Autor'),
      description: new FormControl(),
      published_date: new FormControl(),
      price: new FormControl(),
      totalInStock: new FormControl(),
    });
  }

  submitForm() {
    let bookData = this.bookForm.value;

    this.booksList.push(bookData);

    this.router.navigate(['books']);
  }
}

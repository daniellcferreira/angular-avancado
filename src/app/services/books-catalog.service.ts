import { Injectable } from '@angular/core';
import { IBook } from '../interfaces/IBook.interface';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksCatalogService {
  booksList: IBook[] = [
    {
      _id: '550e8400-e29b-41d4-a716-446655440000',
      catalog_id: 'A002',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      description:
        'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
      publishedDate: new Date('1960-07-11'),
      imageLink:
        'https://m.media-amazon.com/images/I/81aY1lxk+9L._AC_UL320_.jpg',
      price: 9.99,
      totalInStock: 20,
      totalAddedToCart: 0,
    },
    {
      _id: '550e8400-e29b-41d4-a716-446655440001',
      catalog_id: 'A003',
      title: '1984',
      author: 'George Orwell',
      description:
        'A dystopian social science fiction novel and cautionary tale by English writer George Orwell.',
      publishedDate: new Date('1949-06-08'),
      imageLink:
        'https://m.media-amazon.com/images/I/819js3EQwbL._AC_UL320_.jpg',
      price: 10.99,
      totalInStock: 15,
      totalAddedToCart: 0,
    },
    {
      _id: '550e8400-e29b-41d4-a716-446655440002',
      catalog_id: 'A004',
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
      description:
        'The Lord of the Rings is an epic high-fantasy novel by English author and scholar J. R. R. Tolkien.',
      publishedDate: new Date('1954-07-29'),
      imageLink:
        'https://m.media-amazon.com/images/I/91K8TYMlpfL._AC_UL320_.jpg',
      price: 32.99,
      totalInStock: 10,
      totalAddedToCart: 0,
    },
    {
      _id: '550e8400-e29b-41d4-a716-446655440003',
      catalog_id: 'A005',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      description:
        'Pride and Prejudice is a novel by Jane Austen, first published in 1813.',
      publishedDate: new Date('1813-01-28'),
      imageLink:
        'https://m.media-amazon.com/images/I/71cf1cKjsIS._AC_UL320_.jpg',
      price: 11.99,
      totalInStock: 5,
      totalAddedToCart: 0,
    },
    {
      _id: '550e8400-e29b-41d4-a716-446655440004',
      catalog_id: 'A006',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      description:
        'The Catcher in the Rye is a novel by J.D. Salinger, first published in 1951.',
      publishedDate: new Date('1951-07-16'),
      imageLink:
        'https://m.media-amazon.com/images/I/71nXPGovoTL._AC_UL320_.jpg',
      price: 8.99,
      totalInStock: 25,
      totalAddedToCart: 0,
    },
  ];

  constructor() {}

  getAll(): Observable<IBook[]> {
    return of(this.booksList).pipe(delay(5000));
  }

  getOne(id: string): IBook {
    const index = this.findBookIndex(id);
    return this.booksList[index];
  }

  createOne(data: IBook) {
    this.booksList.push(data);
  }

  findBookIndex(id: string): number {
    return this.booksList.findIndex((book: IBook) => book._id === id);
  }

  updateOne(id: string, data: IBook) {
    const index = this.findBookIndex(id);
    this.booksList[index] = data;
  }
}

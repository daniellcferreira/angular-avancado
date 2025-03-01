import { Routes } from '@angular/router';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { BooksCreateComponent } from './pages/books-create/books-create.component';
import { BooksUpdateComponent } from './pages/books-update/books-update.component';

import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'books',
    children: [
      { path: '', component: BooksCatalogComponent },
      {
        path: 'create',
        component: BooksCreateComponent,
      },
      {
        path: 'update/:id',
        component: BooksUpdateComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

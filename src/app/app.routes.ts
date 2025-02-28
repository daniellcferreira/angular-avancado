import { Routes } from '@angular/router';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { BooksCreateComponent } from './pages/books-create/books-create.component';
import { BooksUpdateComponent } from './pages/books-update/books-update.component';
import { authGuard } from './guards/auth.guard';
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
        canActivate: [authGuard],
      },
      {
        path: 'update/:id',
        component: BooksUpdateComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

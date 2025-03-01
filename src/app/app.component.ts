import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { BooksCreateComponent } from './pages/books-create/books-create.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BooksCatalogComponent,
    BooksCreateComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerce';
}

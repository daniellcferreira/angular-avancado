import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/IUser.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private loggedUserSubject = new BehaviorSubject<IUser | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor(private router: Router) {
    this.loggedUserSubject.next(this.getLoggedUser());
  }

  getLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  loginUser(user: IUser): boolean {
    if (user.email == 'admin@admin.com' && user.password == 'admin123') {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      this.loggedUserSubject.next(this.getLoggedUser());
      this.router.navigate(['books']);
      return true;
    }
    return false;
  }

  logoutUser() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    this.loggedUserSubject.next(null);
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    return this.loggedUserSubject.getValue() !== null;
  }
}

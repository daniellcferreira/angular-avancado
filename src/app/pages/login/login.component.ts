import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAuthService } from '../../services/google-auth.service';
import { debounceTime } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private authService: AuthServiceService,
    private googleAuthService: GoogleAuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.loginForm.controls['email'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.updateEmailErrorMessage();
      });

    this.loginForm.controls['password'].valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.updatePasswordErrorMessage();
      });
  }

  updateEmailErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      this.emailError = 'Você deve inserir um valor';
    } else if (this.loginForm.controls['email'].hasError('email')) {
      this.emailError = 'Email inválido';
    } else {
      this.emailError = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      this.passwordError = 'Você deve inserir um valor';
    } else if (this.loginForm.controls['password'].hasError('minlength')) {
      this.passwordError = 'A senha deve ter pelo menos 6 caracteres';
    } else {
      this.passwordError = '';
    }
  }

  submitForm() {
    if (this.loginForm.valid) {
      const loggedIn = this.authService.loginUser(this.loginForm.value);

      if (!loggedIn) {
        this.snackBar.open('Email ou senha inválidos', 'Fechar', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    } else {
      this.updateEmailErrorMessage();
      this.updatePasswordErrorMessage();
    }
  }

  googleLogin() {
    this.googleAuthService.login();
  }
}

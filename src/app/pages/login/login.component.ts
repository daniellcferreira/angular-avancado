import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleAuthService } from '../../services/google-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
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
      password: new FormControl(null, [Validators.required]),
    });
  }

  updateEmailErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      this.emailError = 'You must enter a value';
    } else if (this.loginForm.controls['email'].hasError('email')) {
      this.emailError = 'Not a valid email';
    } else {
      this.emailError = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.loginForm.controls['password'].hasError('required')) {
      this.passwordError = 'You must enter a value';
    } else if (this.loginForm.controls['password'].hasError('minlength')) {
      this.passwordError = 'Password must be at least 6 characters';
    } else {
      this.passwordError = '';
    }
  }

  submitForm() {
    if (this.loginForm.valid) {
      const loggedIn = this.authService.loginUser(this.loginForm.value);
      this.authService.loginUser(this.loginForm.value);

      if (!loggedIn) {
        this.snackBar.open('Invalid email or password', 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2000,
        });
      }
    }
  }

  googleLogin() {
    this.googleAuthService.login();
  }
}

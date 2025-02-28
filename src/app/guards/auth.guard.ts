import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth.service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthServiceService = inject(AuthServiceService);
  const router: Router = inject(Router);

  const userIsAuth = authService.isAuthenticated();
  if (!userIsAuth) router.navigate(['login']);

  return userIsAuth;
};

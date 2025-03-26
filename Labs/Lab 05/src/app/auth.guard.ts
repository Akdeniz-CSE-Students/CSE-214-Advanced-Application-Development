import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // admin contrl
  const isAdmin = authService.getUsers().some(user =>
    user.username === 'admin' && authService.currentUser === 'admin'
  );

  if (!isAdmin) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};


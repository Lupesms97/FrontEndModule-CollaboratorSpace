import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authModuleGuard: CanMatchFn = (route, segments) => {
  const serviceAuth = inject(AuthService);
  const router = inject(Router);
  if (serviceAuth.isLogged$) {
    router.navigate(['/home/blog']);
    return false;
  }
  return true;
};

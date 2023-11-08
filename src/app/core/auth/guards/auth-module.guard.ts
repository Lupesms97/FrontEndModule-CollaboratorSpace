import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { NotificationService } from '../../notificationService/notification.service';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';
import { map } from 'rxjs';

export const authModuleGuard: CanMatchFn = (route, segments) => {
  const serviceAuth = inject(AuthService);
  const router = inject(Router);
  if (serviceAuth.isLogged$) {
    router.navigate(['blog']);
    return false;
  }
  return true;
};

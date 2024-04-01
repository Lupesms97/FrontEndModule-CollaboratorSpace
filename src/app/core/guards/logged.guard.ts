import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notificationService/notification.service';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';

export const loggedGuard: CanActivateFn = (route, state) => {
    const serviceAuth = inject(AuthService);
    const router = inject(Router);
    const notification = inject(NotificationService);
  
    return serviceAuth.isLogged$.pipe(
      tap((isLogged: boolean) => {
        if (!isLogged) {
          router.navigate(['/login']);
          notification.showToast(
            TypeToast.Error,
            'Não autenticado',
            'Você precisa estar autenticado para acessar essa página'
          );
        }
      })
    )
  };
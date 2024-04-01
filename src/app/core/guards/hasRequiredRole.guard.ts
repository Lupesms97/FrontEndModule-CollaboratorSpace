import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { NotificationService } from "../notificationService/notification.service";
import { map } from "rxjs";
import { TypeToast } from "src/app/shared/models/TypeToastenum";


export const hasRequiredRoleGuard: CanActivateFn = (route, state) => {
    const expectedRole = route.data['role'];
      
      const authService: AuthService = inject(AuthService);
      const router: Router = inject(Router);
      const notification: NotificationService = inject(NotificationService);
  
      return authService.role$.pipe(
          map((role) => {
              if (expectedRole.includes(role)) {
                return true;
              }
              notification.showToast(TypeToast.Error, 'Sem permissão', 'Você não esta autenticado para acessar essa página');
              router.navigate(['/login']);
              return false;
          })
      );
  };
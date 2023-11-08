import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Role } from 'src/app/shared/models/Role';
import { NotificationService } from '../../notificationService/notification.service';
import { TypeToast } from 'src/app/shared/models/TypeToastenum';

export const hasRole: CanActivateFn = (route, state) =>  {
  const expectedRole = route.data['role'];
  const serviceAuth = inject(AuthService);
  const router = inject(Router);
  const notification = inject(NotificationService);
  return serviceAuth.user$.pipe(
    map(user => {
      if ( expectedRole.includes(user!.role)) {
        if (!hasRole || expectedRole.includes(Role.UNDEFINED_ROLE)) {
          serviceAuth.cleanRoles();
          serviceAuth.logout();
          router.navigate(['../login']);
          notification.showToast(TypeToast.Error,'Erro de autorização','Acesso negado para ' + serviceAuth.getUserName());
          return false;
        }
        return true; // O usuário tem uma função esperada ou não há usuário (autenticado)
      }else if(!user){
        notification.showToast(TypeToast.Error,'Internal Error',
         ' internal error user not authenticated');
        router.navigate(['../login']);
        return false;
      } else {
        notification.showToast(TypeToast.Error,'Erro de autorização', serviceAuth.getUserName()+ ' Você não tem autorização para acessar essa área 😡🤷‍♂️❌' );
        router.navigate(['../login']);
        return false; // O usuário não tem uma função esperada
      }
    }),
/*     tap(hasRole => {
      if (!hasRole || expectedRole.includes(Role.UNDEFINED_ROLE)) {
        alert(`Acceso negado para ${serviceAuth.getUserName()}`);
        serviceAuth.cleanRoles();
        serviceAuth.logout();
        router.navigate(['login']);
      }
    }) */
  );
}

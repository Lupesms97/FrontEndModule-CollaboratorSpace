import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Role } from 'src/app/shared/models/Role';

export const hasRole: CanActivateFn = (route, state) =>  {
  const expectedRole = route.data['role'];
  const serviceAuth = inject(AuthService);
  const router = inject(Router);
  return serviceAuth.user$.pipe(
    map(user => {
      if (!user || expectedRole.includes(user.role)) {
        return true; // O usuário tem uma função esperada ou não há usuário (autenticado)
      } else {
        return false; // O usuário não tem uma função esperada
      }
    }),
    tap(hasRole => {
      if (!hasRole || expectedRole.includes(Role.UNDEFINED_ROLE)) {
        alert(`Acceso negado para ${serviceAuth.getUserName()}`);
        serviceAuth.cleanRoles();
        serviceAuth.logout();
        router.navigate(['login']);
      }
    })
  );
}

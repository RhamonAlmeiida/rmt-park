import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoguinService } from './services/loguin.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loguinService = inject(LoguinService);
  const router = inject(Router);

  if (loguinService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/loguin']);
    return false;
  }
};

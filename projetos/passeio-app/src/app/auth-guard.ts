import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from './auth-google.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authGoogleService = inject(AuthGoogleService);

  const loggedProfile = authGoogleService.getLoggedProfile();
  if (loggedProfile)
    return true;

  
  router.navigate(['']);
  return false;
};

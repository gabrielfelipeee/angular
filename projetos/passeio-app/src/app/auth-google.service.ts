import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { auth } from './auth.config';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private readonly oAuthService = inject(OAuthService);
  private readonly router = inject(Router);

  private profile = signal<any | null>(null);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    this.oAuthService.configure(auth);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.oAuthService.hasValidIdToken())
          this.profile.set(this.oAuthService.getIdentityClaims())
      });
  };

  login() {
    this.oAuthService.initImplicitFlow();
  };

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this.profile.set(null);
    this.router.navigate(['']);
  };

  getLoggedProfile() {
    return this.profile();
  };

};

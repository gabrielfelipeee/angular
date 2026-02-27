import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {
  private readonly router = inject(Router);
  private readonly authGoogleService = inject(AuthGoogleService);

  profile: Profile | undefined;

  navegar() {
    this.router.navigate(['/paginas/galeria']);
  };

  loginGoogle() {
    this.authGoogleService.login();
  };

  isLoggedIn(): boolean {
    this.profile = this.authGoogleService.getLoggedProfile();
    return Boolean(!!this.profile);
  };
}

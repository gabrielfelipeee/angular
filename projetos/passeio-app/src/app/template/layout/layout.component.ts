import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthGoogleService } from '../../auth-google.service';

type Theme = 'default' | 'dark';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly changeDetector = inject(ChangeDetectorRef);

  private readonly authGoogleService = inject(AuthGoogleService);

  theme: Theme = 'default';
  private readonly themeKey = 'theme';
  private readonly themes: Theme[] = ['default', 'dark'];


  title: string = "";

  ngOnInit(): void {
    this.loadTheme();

    this.router.events
      .pipe(filter(() => this.route.firstChild !== null))
      .subscribe(() => this.setTitlePage());

  };

  setTitlePage() {
    let rotaFilha = this.route.firstChild;

    while (rotaFilha?.firstChild)
      rotaFilha = rotaFilha.firstChild;

    this.title = rotaFilha?.snapshot.data['title'] as string ?? "";
    this.changeDetector.markForCheck();
  };

  sair() {
    this.authGoogleService.logout();
  };


  // Theme 
  private loadTheme(): void {
    const storedTheme = localStorage.getItem(this.themeKey) as Theme | null;

    if (storedTheme && this.themes.includes(storedTheme))
      this.theme = storedTheme;
    else
      this.theme = 'default';

    this.applyTheme();
  };

  private applyTheme(): void {
    const html = document.documentElement;

    // Remove todas as classes de tema
    this.themes.forEach(t => html.classList.remove(t));

    // Adiciona o tema atual se não for default
    if (this.theme !== 'default')
      html.classList.add(this.theme);
  };

  toggleTheme(): void {
    this.theme = this.theme === 'default' ? 'dark' : 'default';
    localStorage.setItem(this.themeKey, this.theme);
    this.applyTheme();
  };
}

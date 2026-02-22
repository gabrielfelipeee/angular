import { Component } from '@angular/core';

type Theme = 'default' | 'dark';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  theme: Theme = 'default';
  private readonly themeKey = 'theme';
  private readonly themes: Theme[] = ['default', 'dark'];

  constructor() {
    this.loadTheme();
  }

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

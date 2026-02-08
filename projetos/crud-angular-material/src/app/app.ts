import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APP_ROUTES, APP_ROUTES_PATHS } from '../app/constants/APP_ROUTES';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './app.html',

})
export class App {
  protected readonly title = signal('crud-angular-material');
  readonly CLIENTES_PATHS = APP_ROUTES_PATHS.CLIENTES;
}

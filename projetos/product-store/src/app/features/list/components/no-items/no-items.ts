import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-no-items',
  templateUrl: './no-items.html',
  styleUrl: './no-items.scss',
  imports: [MatCardModule, MatIcon]
})
export class NoItems {}

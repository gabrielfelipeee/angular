import { Component, inject, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions, MatDialogClose, MatDialogModule, MatDialog } from "@angular/material/dialog";
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Excluir Produto</h2>

    <mat-dialog-content>
      Tem certeza que deseja excluir esse produto?
  </mat-dialog-content>

  <mat-dialog-actions>
    <button matButton mat-dialog-close [matDialogClose]="false">Cancelar</button>
    <button mat-flat-button mat-dialog-close cdkFocusInitial [matDialogClose]="true">Confirmar</button>
  </mat-dialog-actions>
`,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ]
})
export class ConfirmationDialog { }


@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly matDialog = inject(MatDialog);

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialog)
      .afterClosed()
      .pipe(map(response => response === true));
  }
}

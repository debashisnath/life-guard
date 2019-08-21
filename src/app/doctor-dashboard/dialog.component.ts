import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
    template: `
    <!DOCTYPE html>
    <head>
    </head>
    <body>
    <div class="d">
    <h1 mat-dialog-title>Message</h1>
    <mat-dialog-content>
      You have successfully logged out!
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button type="button" mat-dialog-close>Ok</button>
    </mat-dialog-actions>
    </div>
    </body>
    `,
    styles:[`.d{height: 50px;}`]
  })

export class DialogComponent{
  //dialogRef: MatDialogRef<DialogComponent>;
    constructor(
    public dialogRef: MatDialogRef<DialogComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
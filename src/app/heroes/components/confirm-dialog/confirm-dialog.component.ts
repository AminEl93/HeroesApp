import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})

export class ConfirmDialogComponent {

    constructor(
        public _dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Hero
    ) { }

    onNoClick(): void {
        this._dialogRef.close(false);
    }

    onConfirm(): void {
        this._dialogRef.close(true);
    }
}
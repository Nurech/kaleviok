import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-generic-dialog',
    templateUrl: './generic-dialog.component.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
    styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<GenericDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string; content: string; result: boolean }
    ) {}

    onCancel(): void {
        this.data.result = false;
        this.dialogRef.close(this.data);
    }

    onConfirm(): void {
        this.data.result = true;
        this.dialogRef.close(this.data);
    }
}

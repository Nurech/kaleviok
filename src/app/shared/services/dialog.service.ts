import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);
  private dialogRefs = new Map<string, MatDialogRef<any>>();

  open<T, D = any>(component: ComponentType<T>, config: MatDialogConfig<D> = {}): MatDialogRef<T, D> | undefined {
    const key = component.name;

    if (this.dialogRefs.has(key)) {
      console.warn(`Dialog with key "${key}" is already open.`);
      return;
    }

    const dialogRef = this.dialog.open<T, D>(component, config);
    this.dialogRefs.set(key, dialogRef);
    return dialogRef;
  }

  close<T>(component: ComponentType<T>): void {
    const key = component.name;
    const dialogRef = this.dialogRefs.get(key);

    if (dialogRef) {
      dialogRef.close();
      this.dialogRefs.delete(key);
    } else {
      console.warn(`No dialog found with key "${key}" to close.`);
    }
  }

  closeAll(): void {
    this.dialogRefs.forEach((dialogRef) => dialogRef.close());
    this.dialogRefs.clear();
  }
}

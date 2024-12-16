import {Injectable, signal} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {Snackbar, SnackbarType} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbars = signal<Snackbar[]>([]);
  private openSnackbars: Record<string, MatSnackBarRef<SnackbarComponent>> = {};

  constructor(private snackBar: MatSnackBar) {
  }

  snack(newSnackbar: Snackbar) {
    const existing = this.snackbars().find(
      (snackbar: Snackbar) => snackbar.name === newSnackbar.name
    );

    if (existing) {
      this.updateSnackbar({...existing, ...newSnackbar});
    } else {
      this.snackbars.update((state: Snackbar[]) => [...state, newSnackbar]);
      this.showSnackbar(newSnackbar);
    }
  }

  private updateSnackbar(updatedSnackbar: Snackbar) {
    this.snackbars.update((state: Snackbar[]) =>
      state.map((snackbar: Snackbar) =>
        snackbar.name === updatedSnackbar.name ? updatedSnackbar : snackbar
      )
    );

    const snackbarRef = this.openSnackbars[updatedSnackbar.name];
    if (snackbarRef) {
      snackbarRef.instance.data = updatedSnackbar;
    }
  }

  private showSnackbar(snackbar: Snackbar) {
    this.closeSnackbar(snackbar.name);

    const ref: MatSnackBarRef<SnackbarComponent> = this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackbar,
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: snackbar.type ? `snackbar-${snackbar.type}` : undefined,
    });

    this.openSnackbars[snackbar.name] = ref;

    ref.afterDismissed().subscribe(() => {
      this.removeSnackbar(snackbar.name);
    });
  }

  private closeSnackbar(name: SnackbarType) {
    const snackbarRef = this.openSnackbars[name];
    if (snackbarRef) {
      snackbarRef.dismiss();
      delete this.openSnackbars[name];
    }
  }

  private removeSnackbar(name: SnackbarType) {
    this.snackbars.update((state: Snackbar[]) =>
      state.filter((snackbar: Snackbar) => snackbar.name !== name)
    );

    delete this.openSnackbars[name];
  }
}

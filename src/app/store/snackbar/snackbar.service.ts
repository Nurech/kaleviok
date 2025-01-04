import { inject, Injectable, RendererFactory2 } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Snackbar } from './snackbar.model';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);
  private rendererFactory = inject(RendererFactory2);
  private renderer = this.rendererFactory.createRenderer(null, null);
  private clickListener?: () => void;
  private activeSnackBars = new Set<MatSnackBarRef<any>>();

  constructor() {
    this.clickListener = this.renderer.listen('document', 'click', (event) => this.handleOutsideClick(event));
  }

  open(snackbar: Snackbar) {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackbar,
      duration: snackbar.duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: `snackbar-${snackbar.type?.toLowerCase()}`,
    });

    this.activeSnackBars.add(snackBarRef);

    snackBarRef.afterDismissed().subscribe(() => {
      this.activeSnackBars.delete(snackBarRef);
    });
  }

  private handleOutsideClick(event: Event) {
    for (const snackBarRef of this.activeSnackBars) {
      const snackBarElement = document.querySelector('.mat-mdc-snack-bar-container');
      if (snackBarElement && !snackBarElement.contains(event.target as Node)) {
        snackBarRef.dismiss();
        this.activeSnackBars.delete(snackBarRef);
      }
    }
  }
}

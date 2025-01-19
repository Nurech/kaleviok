import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Snackbar } from './snackbar.model';
import { SnackbarComponent } from '../../shared/components/snackbar/snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    private snackBar = inject(MatSnackBar);
    private activeSnackBars = new Set<MatSnackBarRef<any>>();

    open(snackbar: Snackbar) {
        const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
            data: snackbar,
            duration: snackbar.duration,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: `snackbar-${snackbar.type?.toLowerCase()}`
        });

        this.activeSnackBars.add(snackBarRef);

        snackBarRef.afterDismissed().subscribe(() => {
            this.activeSnackBars.delete(snackBarRef);
        });
    }

    closeAll() {
        for (const snackBarRef of this.activeSnackBars) {
            snackBarRef.dismiss();
        }
    }
}

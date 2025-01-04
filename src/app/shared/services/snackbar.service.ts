import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Snackbar, SnackbarType } from '../models/snackbar-model';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private translate = inject(TranslateService);
  private snackBar = inject(MatSnackBar);
  private renderer: Renderer2;
  private clickListener?: () => void;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  open(obj: string | Snackbar) {
    if (typeof obj === 'string') {
      const defaultSnackbar = new Snackbar(SnackbarType.INFO, obj, 3000);
      this.snack(defaultSnackbar);
    } else {
      this.snack(obj);
    }
  }

  private snack(snackbar: Snackbar) {
    if (snackbar.message) {
      snackbar.message = this.translate.instant(snackbar.message);
    }
    if (snackbar.action?.buttonText) {
      snackbar.action.buttonText = this.translate.instant(snackbar.action.buttonText);
    }

    snackbar.self = this.snackBar;

    const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: snackbar,
      duration: snackbar.duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: `snackbar-${snackbar.type?.toLowerCase()}`,
    });

    this.addOutsideClickListener(snackBarRef);
  }

  private addOutsideClickListener(snackBarRef: MatSnackBarRef<any>) {
    const snackBarElement = document.querySelector('.mat-mdc-snack-bar-container');

    const handleOutsideClick = (event: Event) => {
      if (snackBarElement && !snackBarElement.contains(event.target as Node)) {
        snackBarRef.dismiss();
        this.removeOutsideClickListener();
      }
    };

    this.clickListener = this.renderer.listen('document', 'click', handleOutsideClick);

    snackBarRef.afterDismissed().subscribe(() => {
      this.removeOutsideClickListener();
    });
  }

  private removeOutsideClickListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = undefined;
    }
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { state } from '@angular/animations';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Snackbar, SnackbarActions, SnackbarType } from '../../models';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButton, NgIf, MatProgressSpinner, MatIcon, MatIconButton, NgClass],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Snackbar) {}
  protected readonly state = state;
  protected readonly SnackbarState = SnackbarType;
  protected readonly SnackbarActions = SnackbarActions;

  onClose() {
    this.data.self?.dismiss();
  }
}

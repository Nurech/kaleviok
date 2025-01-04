import { Component, inject, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction } from '@angular/material/snack-bar';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Snackbar, SnackbarType } from '../../../store/snackbar/snackbar.model';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, MatIcon, MatIconButton, NgClass, MatAnchor, RouterLink, MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  router = inject(Router);
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Snackbar) {}

  onClose() {
    this.data.self?.dismiss();
  }

  navigateToLink() {
    console.log('Navigating to link', this.data);
    this.router.navigate([this.data.action?.link]);
  }

  protected readonly SnackbarType = SnackbarType;
}

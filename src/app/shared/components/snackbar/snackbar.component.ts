import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Snackbar, SnackbarState } from '../../models';
import { state } from '@angular/animations';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButton, NgIf, MatProgressSpinner, MatIcon],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Snackbar) {}
  protected readonly state = state;
  protected readonly SnackbarState = SnackbarState;
}

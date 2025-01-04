import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction } from '@angular/material/snack-bar';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Snackbar } from '../../../store/snackbar/snackbar.model';
import { closeAllSnackbars } from '../../../store/snackbar/snackbar.actions';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButton, MatProgressSpinner, MatIcon, MatIconButton, NgClass, MatAnchor, RouterLink, MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  private router = inject(Router);
  private store$ = inject(Store);
  private elementRef = inject(ElementRef);
  data: Snackbar = inject(MAT_SNACK_BAR_DATA);

  onClose() {
    this.store$.dispatch(closeAllSnackbars());
  }

  navigateToLink() {
    console.log('Navigating to link', this.data);
    this.router.navigate([this.data.action?.link]);
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.onClose();
    }
  }
}

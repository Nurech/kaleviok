import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction } from '@angular/material/snack-bar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Snackbar } from '../../../store/snackbar/snackbar.model';
import { closeAllSnackbars } from '../../../store/snackbar/snackbar.actions';

@Component({
    selector: 'app-snackbar',
    standalone: true,
    imports: [MatButton, MatIcon, MatIconButton, MatSnackBarAction],
    templateUrl: './snackbar.component.html',
    styleUrl: './snackbar.component.scss'
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

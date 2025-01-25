import { Injectable, signal } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root'
})
export class DrawerService {
    drawer!: MatSidenav;
    isOpen = signal(false);

    toggle() {
        if (this.drawer) {
            this.drawer.toggle().then(() => this.isOpen.set(!this.isOpen()));
        }
    }

    open() {
        if (this.drawer) {
            this.drawer.open().then(() => this.isOpen.set(true));
        }
    }

    close() {
        if (this.drawer) {
            this.drawer.close().then(() => this.isOpen.set(false));
        }
    }
}

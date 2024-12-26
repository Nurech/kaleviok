import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private deferredPrompt: any;

  constructor() {
    console.warn('PWA service initialized');
    this.listenForInstallPrompt();
  }

  private listenForInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (event) => {
      console.log('beforeinstallprompt event fired');
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  isPwaInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches;
  }

  async triggerPwaInstall(): Promise<void> {
    if (this.deferredPrompt) {
      // Show the install prompt
      this.deferredPrompt.prompt();

      // Wait for the user's response
      const { outcome } = await this.deferredPrompt.userChoice;

      console.log(`User response to the install prompt: ${outcome}`);

      // Clear the deferredPrompt since it can't be used again
      this.deferredPrompt = null;
    } else {
      console.log('No install prompt available');
    }
  }
}

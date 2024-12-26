import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private deferredPrompt: any;

  canInstall = signal(false);
  runningInPwa = signal(false);
  isInstalled = signal(false);

  constructor() {
    console.log('PWA service initialized');
    this.listenForEvents();
    this.checkIfInstalled();
  }

  private listenForEvents() {
    const isPwa = () => {
      return ['fullscreen', 'standalone', 'minimal-ui'].some(
        (displayMode) => window.matchMedia('(display-mode: ' + displayMode + ')').matches,
      );
    };

    if (isPwa()) {
      console.log('webapp is installed');
      this.canInstall.set(false);
      this.runningInPwa.set(true);
    }

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall.set(true);
      console.log('Installation prompt available');
    });

    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.isInstalled.set(true);
      console.log('App has been installed');
    });
  }

  private checkIfInstalled() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled.set(true);
    }
  }

  async triggerInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      console.log('Installation Dialog opened');

      const { outcome } = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;

      if (outcome === 'accepted') {
        console.log('User accepted the install prompt.');
        this.canInstall.set(false);
      } else {
        console.log('User dismissed the install prompt');
      }
    } else {
      console.log('No install prompt available');
    }
  }
}

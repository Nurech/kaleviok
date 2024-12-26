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
    this.detectPwaEnvironment();
    this.listenForEvents();
  }

  private detectPwaEnvironment() {
    const displayMode = this.getPWADisplayMode();

    if (displayMode !== 'unknown') {
      console.log('App is running in PWA mode');
      this.runningInPwa.set(true);
      this.canInstall.set(false);
    } else {
      console.log('App is not running in PWA mode');
      this.runningInPwa.set(false);
    }
  }

  private listenForEvents() {
    // Listen for the `beforeinstallprompt` event
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall.set(true);
      console.log('Installation prompt is available');
    });

    // Listen for the `appinstalled` event
    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.isInstalled.set(true);
      console.log('App has been installed');
    });
  }

  private getPWADisplayMode(): string {
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    }
    if (window.matchMedia('(display-mode: browser)').matches) {
      return 'browser';
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return 'standalone';
    }
    if (window.matchMedia('(display-mode: minimal-ui)').matches) {
      return 'minimal-ui';
    }
    if (window.matchMedia('(display-mode: fullscreen)').matches) {
      return 'fullscreen';
    }
    if (window.matchMedia('(display-mode: window-controls-overlay)').matches) {
      return 'window-controls-overlay';
    }
    return 'unknown';
  }

  async triggerInstall() {
    console.log('this.deferredPrompt', this.deferredPrompt);
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt(); // Trigger the install prompt
      console.log('Installation Dialog opened');

      const { outcome } = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null; // Reset the deferred prompt after use

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

import { inject, Injectable, signal, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { openBottomSheet } from '../../store/core/core.actions';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  store$ = inject(Store);
  storage = inject(StorageService);
  DONT_SHOW_PWA_PROMOTION = 'dont_show_pwa_promotion';
  private deferredPrompt: any;

  canInstall = signal(false);
  runningInPwa = signal(false);
  isInstalled = signal(false);
  displayMode = signal('');

  constructor() {
    this.detectPwaEnvironment();
    this.listenForEvents();
    effect(() => this.handleInstallPromotion(), { allowSignalWrites: true });
  }

  private detectPwaEnvironment() {
    this.displayMode.set(this.getPWADisplayMode());

    if (['standalone', 'minimal-ui', 'fullscreen', 'window-controls-overlay'].includes(this.displayMode())) {
      this.runningInPwa.set(true);
      this.canInstall.set(false);
    } else {
      this.runningInPwa.set(false);
    }
  }

  private listenForEvents() {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.canInstall.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.canInstall.set(false);
      this.isInstalled.set(true);
      this.deferredPrompt = null;
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
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        this.canInstall.set(false);
      }
    }
  }

  private handleInstallPromotion() {
    const showPromotion = this.storage.get(this.DONT_SHOW_PWA_PROMOTION) !== 'true';
    if (showPromotion && this.canInstall() && !this.runningInPwa()) {
      this.store$.dispatch(openBottomSheet({ component: 'InstallPwaComponent' }));
    }
  }
}

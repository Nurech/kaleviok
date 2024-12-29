import { inject, Injectable, signal, effect } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { SheetService } from './sheet.service';
import { DialogService } from './dialog.service';
import { PwaUpdateDialogComponent } from '../../core/components/pwa-update-dialog/pwa-update-dialog.component';
import { selectMySetting } from '../../store/settings/settings.selectors';

@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private store$ = inject(Store);
  private sheetService = inject(SheetService);
  private dialogService = inject(DialogService);
  private swUpdate = inject(SwUpdate);
  private deferredPrompt: any;
  UPDATE_INTERVAL = 30 * 1000;

  canInstall = signal(false);
  runningInPwa = signal(false);
  isInstalled = signal(false);
  displayMode = signal('');

  constructor() {
    this.detectPwaEnvironment();
    this.listenForEvents();
    effect(() => this.handleInstallPromotion(), { allowSignalWrites: true });
    this.startUpdateCheck();
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
    this.store$.select(selectMySetting('showPwaPopup')).subscribe((showPwaPopup) => {
      if (showPwaPopup) {
        console.warn('showPwaPopup', showPwaPopup);
        if (showPwaPopup && this.canInstall() && !this.runningInPwa()) {
          this.sheetService.open('InstallPwaComponent');
        }
      }
    });
  }

  private startUpdateCheck() {
    if (!this.swUpdate.isEnabled) {
      console.warn('Service worker updates are not enabled.');
      return;
    }

    setInterval(async () => {
      try {
        const isUpdateAvailable = await this.swUpdate.checkForUpdate();
        if (isUpdateAvailable) {
          this.promptUserForUpdate();
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    }, this.UPDATE_INTERVAL);
  }

  private promptUserForUpdate() {
    this.dialogService.open(PwaUpdateDialogComponent);
  }
}

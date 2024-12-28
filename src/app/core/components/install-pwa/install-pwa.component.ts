import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatBadge } from '@angular/material/badge';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { BrowserType, DeviceService, PlatformType } from '../../../shared/services/device.service';
import { StorageService } from '../../../shared/services/storage.service';
import { PwaService } from '../../../shared/services/pwa.service';

@Component({
  selector: 'app-install-pwa',
  templateUrl: './install-pwa.component.html',
  imports: [MatSlideToggle, InfoComponent, MatButton, NgTemplateOutlet, MatIcon, TranslatePipe, MatBadge],
  standalone: true,
})
export class InstallPwaComponent implements OnInit {
  @ViewChild('chromeWeb', { static: true }) chromeWeb!: TemplateRef<any>;
  @ViewChild('chromeAndroid', { static: true }) chromeAndroid!: TemplateRef<any>;
  @ViewChild('chromeIos', { static: true }) chromeIos!: TemplateRef<any>;
  @ViewChild('safariIos', { static: true }) safariIos!: TemplateRef<any>;
  @ViewChild('other', { static: true }) other!: TemplateRef<any>;

  deviceService = inject(DeviceService);
  storage = inject(StorageService);
  pwaService = inject(PwaService);

  currentTemplate: TemplateRef<any> | null = null;

  ngOnInit() {
    this.selectTemplate();
  }

  private selectTemplate() {
    const browser = this.deviceService.browser();
    const platform = this.deviceService.platform();

    if (browser === BrowserType.CHROME) {
      if (platform === PlatformType.ANDROID) {
        this.currentTemplate = this.chromeAndroid;
      } else if (platform === PlatformType.IOS) {
        this.currentTemplate = this.chromeIos;
      } else {
        this.currentTemplate = this.chromeWeb;
      }
    } else if (browser === BrowserType.SAFARI && platform === PlatformType.IOS) {
      this.currentTemplate = this.safariIos;
    } else {
      this.currentTemplate = this.other;
    }
  }

  dontShowAgain(checked: boolean) {
    this.storage.set(this.pwaService.DONT_SHOW_PWA_PROMOTION, checked.toString());
  }
}

import { Component, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButton } from '@angular/material/button';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { BrowserType, DeviceService, PlatformType } from '../../../shared/services/device.service';
import { PwaService } from '../../../shared/services/pwa.service';
import { updateSettings } from '../../../store/settings/settings.actions';

@Component({
    selector: 'app-install-pwa',
    templateUrl: './install-pwa.component.html',
    imports: [MatSlideToggle, InfoComponent, MatButton, NgTemplateOutlet, MatIcon, TranslatePipe],
    standalone: true
})
export class InstallPwaComponent implements OnInit {
    readonly chromeWeb = viewChild.required<TemplateRef<any>>('chromeWeb');
    readonly chromeAndroid = viewChild.required<TemplateRef<any>>('chromeAndroid');
    readonly chromeIos = viewChild.required<TemplateRef<any>>('chromeIos');
    readonly safariIos = viewChild.required<TemplateRef<any>>('safariIos');
    readonly other = viewChild.required<TemplateRef<any>>('other');

    deviceService = inject(DeviceService);
    pwaService = inject(PwaService);
    store$ = inject(Store);

    currentTemplate: TemplateRef<any> | null = null;

    ngOnInit() {
        this.selectTemplate();
    }

    private selectTemplate() {
        const browser = this.deviceService.browser();
        const platform = this.deviceService.platform();

        if (browser === BrowserType.CHROME) {
            if (platform === PlatformType.ANDROID) {
                this.currentTemplate = this.chromeAndroid();
            } else if (platform === PlatformType.IOS) {
                this.currentTemplate = this.chromeIos();
            } else {
                this.currentTemplate = this.chromeWeb();
            }
        } else if (browser === BrowserType.SAFARI && platform === PlatformType.IOS) {
            this.currentTemplate = this.safariIos();
        } else {
            this.currentTemplate = this.other();
        }
    }

    dontShowAgain(checked: boolean) {
        this.store$.dispatch(updateSettings({ changes: { showPwaPopup: !checked } }));
    }
}

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);

  isHandheld = signal(false);
  browser = signal<BrowserType>(this.detectBrowser());
  platform = signal<PlatformType>(this.detectPlatform());

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches))
      .subscribe((isHandheld) => this.isHandheld.set(isHandheld));
  }

  private detectBrowser(): BrowserType {
    const userAgent = navigator.userAgent;
    if (/chrome|chromium|crios/i.test(userAgent) && !/safari/i.test(userAgent)) {
      return BrowserType.CHROME;
    } else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
      return BrowserType.SAFARI;
    }
    return BrowserType.OTHER;
  }

  private detectPlatform(): PlatformType {
    if ('userAgentData' in navigator) {
      const userAgentData = (navigator as any).userAgentData;
      if (userAgentData.platform) {
        if (userAgentData.platform.includes('Win')) {
          return PlatformType.WINDOWS;
        } else if (
          userAgentData.platform.includes('iOS') ||
          (userAgentData.platform.includes('Mac') && navigator.maxTouchPoints > 1)
        ) {
          return PlatformType.IOS;
        } else if (userAgentData.platform.includes('Android')) {
          return PlatformType.ANDROID;
        }
      }
    }

    const userAgent = navigator.userAgent;
    if (/win/i.test(userAgent)) {
      return PlatformType.WINDOWS;
    } else if (/iphone|ipad|ipod|mac/i.test(userAgent) && navigator.maxTouchPoints > 1) {
      return PlatformType.IOS;
    } else if (/android/i.test(userAgent)) {
      return PlatformType.ANDROID;
    }

    return PlatformType.OTHER;
  }
}

export enum BrowserType {
  CHROME = 'Chrome',
  SAFARI = 'Safari',
  OTHER = 'Other',
}

export enum PlatformType {
  WINDOWS = 'Windows',
  IOS = 'iOS',
  ANDROID = 'Android',
  OTHER = 'Other',
}

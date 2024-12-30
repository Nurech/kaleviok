import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {inject, Injectable, signal, effect} from '@angular/core';
import {map} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);

  isHandheld = signal(true);
  browser = signal<BrowserType>(this.detectBrowser());
  platform = signal<PlatformType>(this.detectPlatform());

  constructor() {
    const isHandheld$ = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((result) => result.matches));

    effect(() => {
      isHandheld$.subscribe((isHandheld) => this.isHandheld.set(isHandheld));
    }, {allowSignalWrites: true});
  }

  private detectBrowser(): BrowserType {
    const userAgent = navigator.userAgent;
    if (/chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
      return BrowserType.CHROME;
    }
    if (/safari/i.test(userAgent) && !/chrome|chromium|crios|edg/i.test(userAgent)) {
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

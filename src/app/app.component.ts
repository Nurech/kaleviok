import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MaterialColorName, ThemePalette} from '../types';
import { LibUsageComponent } from './lib-usage/lib-usage.component';
import { LayoutComponent } from './core/layout/layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, shareReplay, takeUntil } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { share } from './utils';
import { MatIconRegistry, IconResolver } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeviceService } from './shared/services/device.service';
import { MatDialog } from '@angular/material/dialog';
import {ThemeChangerService} from './shared/services/theme-changer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LibUsageComponent,
    LayoutComponent,
    MatCardModule,
    MatButtonModule,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private route = inject(ActivatedRoute);
  private themeChanger = inject(ThemeChangerService);
  private mainCardContainer =
    viewChild<ElementRef<HTMLDivElement>>('mainCardContainer');
  private breakpointObserver = inject(BreakpointObserver);
  private destroyed = new Subject<void>();
  tabTopGap = signal(0);
  isHandset$ = inject(DeviceService).isHandset$;
  isFirstTime = true;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    const resolver: IconResolver = (name) =>
      sanitizer.bypassSecurityTrustResourceUrl(`/icons/${name}.svg`);
    iconRegistry.addSvgIconResolver(resolver);
  }

  ngOnInit(): void {
    this.isFirstTime = !JSON.parse(
      localStorage.getItem('themes-first-visited') ?? 'false'
    );
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            const element = this.mainCardContainer()?.nativeElement;
            if (element) {
              this.tabTopGap.set(element.offsetHeight + 18);
            } else {
              this.tabTopGap.set(query === Breakpoints.Small ? 115 : 105);
            }
          }
        }
      });

    this.route.queryParamMap.subscribe((params) => {
      const themePalette: ThemePalette = {
        primary: '',
        secondary: '',
        tertiary: '',
        error: '',
        neutral: '',
        'neutral-variant': '',
      };

      const keys = Object.keys(themePalette);

      keys.forEach((key) => {
        themePalette[key as keyof ThemePalette] = params.get(key) ?? '';
      });

      // apply seed colors
      keys.forEach((key) => {
        const pKey = key as keyof ThemePalette;
        if (themePalette[pKey]) {
          if (this.themeChanger.themeSeedChanger[pKey]) {
            this.themeChanger.themeSeedChanger[pKey](themePalette[pKey]);
          }
        }
      });

      // apply sys colors
      params.keys.forEach((key) => {
        const color = params.get(key);
        const materialColorName = key as MaterialColorName;
        if (color && this.themeChanger.theme[materialColorName]) {
          this.themeChanger.themeChanger(materialColorName, color);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    const element = this.mainCardContainer()?.nativeElement;
    if (element) {
      this.tabTopGap.set(element.offsetHeight + 18);
    } else {
      this.tabTopGap.set(
        this.breakpointObserver.isMatched(Breakpoints.XSmall)
          ? 105
          : this.breakpointObserver.isMatched(Breakpoints.Small)
            ? 115
            : 0
      );
    }
  }

  closeBanner() {
    this.isFirstTime = false;
    localStorage.setItem('themes-first-visited', 'true');
    this.tabTopGap.set(
      this.breakpointObserver.isMatched(Breakpoints.XSmall)
        ? 105
        : this.breakpointObserver.isMatched(Breakpoints.Small)
          ? 115
          : 0
    );
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

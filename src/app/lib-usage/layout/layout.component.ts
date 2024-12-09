import {Component, inject} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AsyncPipe} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {routes} from '../../app.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {applyTheme, argbFromHex, themeFromSourceColor,} from '@material/material-color-utilities';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DeviceService} from '../../shared/services/device.service';
import {ThemeChangerComponent} from '../../lib/colors/theme-changer.component';
import {CopyCSSComponent} from '../../lib/components/copy-css/copy-css.component';
import {ShareURLComponent} from '../../lib/components/share-url/share-url.component';
import {ColorModeComponent} from '../../lib/components/color-mode/color-mode.component';

@Component({
  selector: 'app-lib-usage-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ThemeChangerComponent,
    MatTooltipModule,
    CopyCSSComponent,
    ShareURLComponent,
    ColorModeComponent
  ],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  rootRoutes = routes.filter((r) => r.path);

  isHandset$ = inject(DeviceService).isHandset$;

  simpleDynamicColor() {
    const sourceColor = '#FFDE3F';
    const targetElement = document.documentElement;

    // Get the theme from a hex color
    const theme = themeFromSourceColor(argbFromHex(sourceColor));

    // Print out the theme as JSON
    console.log(JSON.stringify(theme, null, 2));

    // Identify if user prefers dark theme
    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    // Apply theme to root element
    applyTheme(theme, {
      target: targetElement,
      dark: systemDark,
      brightnessSuffix: true,
    });

    const styles = targetElement.style;

    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        const propName = styles[key];
        if (propName.indexOf('--md-sys') === 0) {
          const sysPropName = '--sys' + propName.replace('--md-sys-color', '');
          targetElement.style.setProperty(
            sysPropName,
            targetElement.style.getPropertyValue(propName)
          );
        }
      }
    }
  }
}

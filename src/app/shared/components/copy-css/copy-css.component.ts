import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import {CopyToClipboardDirective} from '../../directives/copy-to-clipboard.directive';
import {ThemeChangerService} from '../../services/theme-changer.service';
import {ThemeExporterService} from '../../../lib/colors/theme-exporter.service';

@Component({
  selector: 'app-copy-css',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    CopyToClipboardDirective,
    OverlayModule,
    MatCard,
    MatCardContent,
    MatMenuModule
  ],
  templateUrl: './copy-css.component.html',
})
export class CopyCSSComponent implements AfterViewInit {
  @Input() variant: 'compact' | 'full' = 'compact';
  isOpen = false;
  private themeChanger = inject(ThemeChangerService);
  private themeExporter = inject(ThemeExporterService);
  private dialog = inject(MatDialog);

  readonly defaultPositionList: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    },
  ];

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      if (this.dialog.openDialogs.length === 0) {
        this.isOpen = !JSON.parse(
          localStorage.getItem('themes-first-css') ?? 'false'
        );
      } else {
        this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
          this.isOpen = !JSON.parse(
            localStorage.getItem('themes-first-css') ?? 'false'
          );
        });
      }
    });
  }

  getThemeString() {
    return this.themeChanger.themeString;
  }

  getM2Theme() {
    return this.themeExporter.exportM2Theme(
      this.themeChanger.themeSeed.primary(),
      this.themeChanger.themeSeed.tertiary(),
      this.themeChanger.themeSeed.error()
    );
  }

  copied(copied: boolean) {
    if (this.isOpen) {
      this.closePopover();
    }
  }

  closePopover() {
    this.isOpen = false;
    localStorage.setItem('themes-first-css', 'true');
  }
}

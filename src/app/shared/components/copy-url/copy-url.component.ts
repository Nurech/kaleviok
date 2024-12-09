import {Component, inject, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCard, MatCardContent} from '@angular/material/card';
import {ConnectedPosition, OverlayModule} from '@angular/cdk/overlay';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs';
import {CopyToClipboardDirective} from '../../directives/copy-to-clipboard.directive';
import {ThemeChangerService} from '../../services/theme-changer.service';

@Component({
  selector: 'app-copy-url',
  standalone: true,
  imports: [
    MatIconModule,
    MatTooltipModule,
    CopyToClipboardDirective,
    MatCard,
    MatCardContent,
    OverlayModule,
  ],
  templateUrl: './copy-url.component.html',
})
export class CopyURLComponent {
  @Input() variant: 'compact' | 'full' = 'compact';
  private themeChanger = inject(ThemeChangerService);
  private dialog = inject(MatDialog);

  getThemeURL() {
    return this.themeChanger.getURL();
  }

  isOpen = false;
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
          localStorage.getItem('themes-first-link') ?? 'false'
        );
      } else {
        this.dialog.afterAllClosed.pipe(take(1)).subscribe(() => {
          this.isOpen = !JSON.parse(
            localStorage.getItem('themes-first-link') ?? 'false'
          );
        });
      }
    });
  }

  copied() {
    if (this.isOpen) {
      this.closePopover();
    }
  }

  closePopover() {
    this.isOpen = false;
    localStorage.setItem('themes-first-link', 'true');
  }
}

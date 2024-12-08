import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeChangerService } from '../../colors/theme-changer.service';
import { CopyToClipboardDirective } from '../../../shared/directives/copy-to-clipboard.directive';

@Component({
  selector: 'lib-copy-css',
  templateUrl: 'copy-css.component.html',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, CopyToClipboardDirective, MatIconModule],
})
export class CopyCSSComponent {
  private themeChangerService = inject(ThemeChangerService);
  getThemeString() {
    return this.themeChangerService.themeString;
  }
}

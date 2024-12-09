import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ThemeChangerService} from '../../colors/theme-changer.service';
import {CopyToClipboardDirective} from '../../../shared/directives/copy-to-clipboard.directive';

@Component({
  selector: 'lib-share-url',
  templateUrl: 'share-url.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    CopyToClipboardDirective,
    MatIconModule,
  ],
})
export class ShareURLComponent {
  private themeChangerService = inject(ThemeChangerService);
  getThemeURL() {
    return this.themeChangerService.getURL();
  }
}

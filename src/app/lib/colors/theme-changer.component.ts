import {Component, input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';

import {ThemeSeedColorsComponent} from '../components/seed-colors/seed-colors.component';
import {ThemeGeneratedColorsComponent} from '../components/generated-colors/generated-colors.component';
import {CopyCSSComponent} from '../components/copy-css/copy-css.component';
import {ShareURLComponent} from '../components/share-url/share-url.component';
import {ColorModeComponent} from '../components/color-mode/color-mode.component';
import {AlertComponent, AlertHeadingDirective,} from '../components/alert/alert.component';
import {ImageInputComponent} from '../components/image-input/image-input.component';

@Component({
  selector: 'app-theme-changer',
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    ThemeSeedColorsComponent,
    ThemeGeneratedColorsComponent,
    CopyCSSComponent,
    ShareURLComponent,
    ColorModeComponent,
    AlertComponent,
    AlertHeadingDirective,
    ImageInputComponent
  ],
  templateUrl: './theme-changer.component.html',
  styleUrl: './theme-changer.component.scss',
})
export class ThemeChangerComponent {
  tabTopGap = input(0);
}

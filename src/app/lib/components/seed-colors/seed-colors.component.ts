import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { ColorInputComponent } from '../color-input/color-input.component';
import { ThemeChangerService } from '../../colors/theme-changer.service';

@Component({
  selector: 'lib-theme-seed-colors',
  templateUrl: 'seed-colors.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatIconModule,
    ColorInputComponent,
    MatDividerModule,
  ],
})
export class ThemeSeedColorsComponent {
  private themeChanger = inject(ThemeChangerService);

  seedValue = this.themeChanger.themeSeed.primary;
  seedValueChanged(value: string) {
    this.themeChanger.themeSeedChanger.primary(value);
  }

  secondaryValue = this.themeChanger.themeSeed.secondary;
  secondaryValueChanged(value: string) {
    this.themeChanger.themeSeedChanger.secondary(value);
  }

  tertiaryValue = this.themeChanger.themeSeed.tertiary;
  tertiaryValueChanged(value: string) {
    this.themeChanger.themeSeedChanger.tertiary(value);
  }

  neutralValue = this.themeChanger.themeSeed.neutral;
  neutralValueChanged(value: string) {
    this.themeChanger.themeSeedChanger.neutral(value);
  }

  neutralVariantValue = this.themeChanger.themeSeed['neutral-variant'];
  neutralVariantValueChanged(value: string) {
    this.themeChanger.themeSeedChanger['neutral-variant'](value);
  }

  errorValue = this.themeChanger.themeSeed.error;
  errorValueChanged(value: string) {
    this.themeChanger.themeSeedChanger.error(value);
  }
}

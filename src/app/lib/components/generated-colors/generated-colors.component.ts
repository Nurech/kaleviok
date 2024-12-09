import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent, AlertHeadingDirective,} from '../alert/alert.component';
import {ColorInputComponent} from '../color-input/color-input.component';
import {ThemeChangerService} from '../../colors/theme-changer.service';
import {MaterialColorName} from '../../types';

@Component({
  selector: 'lib-theme-generated-colors',
  templateUrl: 'generated-colors.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTooltipModule,
    ColorInputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    AlertHeadingDirective,
  ],
  styleUrl: 'generated-colors.component.scss',
})
export class ThemeGeneratedColorsComponent {
  search = new FormControl<string>('');
  private themeChangerService = inject(ThemeChangerService);

  sysColors: string[] = Object.keys(this.themeChangerService.theme);
  filteredSysColors = this.sysColors.slice();

  constructor() {
    this.search.valueChanges.subscribe((v) => {
      if (!v) {
        this.filteredSysColors = this.sysColors.slice();
      } else {
        const searchTerm = v.toLowerCase();
        this.filteredSysColors = this.sysColors.filter((name) =>
          name.toLowerCase().includes(searchTerm)
        );
      }
    });
  }

  resetSysColors() {
    this.themeChangerService.resetSysColors();
    // this.sysColors = Object.keys(this.themeChangerService.theme);
  }

  getSysColorValue(sysColorName: string) {
    const sysColorSignal = this.themeChangerService.theme[sysColorName as MaterialColorName];
    return sysColorSignal ? sysColorSignal : () => '';
  }

  setSysColorValue(sysColorName: string, color: string) {
    this.themeChangerService.themeChanger(sysColorName as MaterialColorName, color);
  }
}

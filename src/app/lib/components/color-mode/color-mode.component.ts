import { AfterViewInit, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { ThemeChangerService } from '../../colors/theme-changer.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorMode } from '../../types';

@Component({
  selector: 'lib-color-mode',
  templateUrl: 'color-mode.component.html',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ColorModeComponent implements AfterViewInit {
  mode = new FormControl<ColorMode>('auto', { nonNullable: true });

  private themeChangerService = inject(ThemeChangerService);

  ngAfterViewInit(): void {
    this.mode.setValue(this.themeChangerService.colorMode(), {
      emitEvent: false,
    });

    this.mode.valueChanges.subscribe((v) => {
      this.themeChangerService.changeColorMode(v);
    });
  }
}

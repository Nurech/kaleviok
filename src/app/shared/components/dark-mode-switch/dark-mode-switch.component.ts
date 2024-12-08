import { Component, Input, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {ThemeChangerService} from '../../services/theme-changer.service';
import {ColorMode} from '../../../../types';

@Component({
  selector: 'app-dark-mode-switch',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './dark-mode-switch.component.html',
  styleUrls: ['./dark-mode-switch.component.scss'],
})
export class DarkModeSwitchComponent {
  @Input() variant: 'compact' | 'full' = 'compact';
  private themeChanger = inject(ThemeChangerService);
  colorMode = this.themeChanger.colorMode;

  changeTheme(mode: string) {
    this.themeChanger.changeColorMode(mode as ColorMode);
  }
}

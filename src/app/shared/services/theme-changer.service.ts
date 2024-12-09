import {Injectable, signal, WritableSignal} from '@angular/core';
import queryString from 'query-string';
import {
  changeColorAndMode,
  changeColorMode,
  changeErrorColor,
  changeNeutralColor,
  changeNeutralVariantColor,
  changeSecondaryColor,
  changeSeedColor,
  changeSysColor,
  changeTertiaryColor,
  getCurrentErrorColor,
  getCurrentMode,
  getCurrentNeutralColor,
  getCurrentNeutralVariantColor,
  getCurrentSecondaryColor,
  getCurrentSeedColor,
  getCurrentTertiaryColor,
  getCurrentThemePalette,
  getCurrentThemeString,
  getLastSavedAutoColorMode,
  isModeDark,
  resetSysColors,
} from '../utils/theme';
import {AppTheme, ColorMode, MaterialColorName, ThemePalette} from '../../../types';
import {DEFAULT_THEME_COLORS} from '../utils/constants';
import {hexFromArgb, sourceColorFromImage} from '@material/material-color-utilities';

@Injectable({providedIn: 'root'})
export class ThemeChangerService {
  themeSeed = {
    primary: signal(DEFAULT_THEME_COLORS.primary),
    secondary: signal(DEFAULT_THEME_COLORS.secondary),
    tertiary: signal(DEFAULT_THEME_COLORS.tertiary),
    error: signal(DEFAULT_THEME_COLORS.error),
    neutral: signal(DEFAULT_THEME_COLORS.neutral),
    'neutral-variant': signal(DEFAULT_THEME_COLORS['neutral-variant']),
  };
  theme: Partial<AppTheme<WritableSignal<string>>> = {};

  colorMode = signal<ColorMode>('auto');

  readonly themeSeedChanger: Record<
    keyof ThemePalette,
    (color: string) => void
  > = {
    primary: (color: string) => this.changeSeedColor(color),
    secondary: (color: string) => this.changeSecondaryColor(color),
    tertiary: (color: string) => this.changeTertiaryColor(color),
    error: (color: string) => this.changeErrorColor(color),
    neutral: (color: string) => this.changeNeutralColor(color),
    'neutral-variant': (color: string) => this.changeNeutralVariantColor(color),
  };

  constructor() {
    this.applyColorThemeListeners();
    this.initializeTheme();
    this.determinePageNavigationAutoMode();
  }

  get themeString() {
    return getCurrentThemeString();
  }

  applyColorThemeListeners() {
    // Listen for system color change and applies the new theme if the current
    // color mode is 'auto'.
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (getCurrentMode() !== 'auto') {
          return;
        }

        changeSeedColor(this.themeSeed.primary());
      });
  }

  initializeTheme() {
    const currentThemeString = getCurrentThemeString();
    const currentTheme = getCurrentThemePalette();
    if (currentThemeString && currentTheme) {
      this.setThemeFromStorage();
    } else {
      changeColorAndMode(this.themeSeed.primary(), 'auto');
      changeTertiaryColor(this.themeSeed.tertiary());
    }
    this.generateThemeFromStorage();
  }

  determinePageNavigationAutoMode() {
    if (getCurrentMode() !== 'auto') {
      return;
    }

    const actualColorMode = isModeDark('auto', false) ? 'dark' : 'light';
    const lastSavedAutoColorMode = getLastSavedAutoColorMode();

    if (actualColorMode !== lastSavedAutoColorMode) {
      // Recalculate auto mode with the same theme color.
      this.changeColorMode('auto');
    }
  }

  changeColorMode(mode: ColorMode) {
    this.colorMode.set(mode);
    changeColorMode(mode);
    this.generateThemeFromStorage();
  }

  setThemeFromStorage() {
    this.themeSeed.primary.set(
      getCurrentSeedColor() ?? DEFAULT_THEME_COLORS.primary
    );
    this.themeSeed.secondary.set(
      getCurrentSecondaryColor() ?? DEFAULT_THEME_COLORS.secondary
    );
    this.themeSeed.tertiary.set(
      getCurrentTertiaryColor() ?? DEFAULT_THEME_COLORS.tertiary
    );
    this.themeSeed.error.set(
      getCurrentErrorColor() ?? DEFAULT_THEME_COLORS.error
    );
    this.themeSeed.neutral.set(
      getCurrentNeutralColor() ?? DEFAULT_THEME_COLORS.neutral
    );
    this.themeSeed['neutral-variant'].set(
      getCurrentNeutralVariantColor() ?? DEFAULT_THEME_COLORS['neutral-variant']
    );
  }

  generateThemeFromStorage() {
    const currentTheme = getCurrentThemePalette();
    for (const key in currentTheme) {
      if (Object.prototype.hasOwnProperty.call(currentTheme, key)) {
        const materialColorName = key as MaterialColorName;
        const value = currentTheme[materialColorName];
        if (this.theme[materialColorName]) {
          this.theme[materialColorName]!.set(value);
        } else {
          this.theme[materialColorName] = signal(value);
        }
      }
    }
  }

  async changeSeedFromImage(img: HTMLImageElement) {
    const color = await sourceColorFromImage(img);
    const strColor = hexFromArgb(color);
    console.log(strColor);
    this.changeSeedColor(strColor);
  }

  changeSeedColor(color: string) {
    changeSeedColor(color);
    this.themeSeed.primary.set(color);
    const theme = getCurrentThemePalette()!;
    this.setOtherColorsFromThemeObject(theme);
  }

  setOtherColorsFromThemeObject(theme: AppTheme) {
    const secondaryColor = theme['secondary'];
    this.changeSecondaryColor(secondaryColor);

    const tertiaryColor = theme['tertiary'];
    this.changeTertiaryColor(tertiaryColor);

    const errorColor = theme['error'];
    this.changeErrorColor(errorColor);

    const neutralColor = theme['neutral'];
    this.changeNeutralColor(neutralColor);

    const neutralVariantColor = theme['neutral-variant'];
    this.changeNeutralVariantColor(neutralVariantColor);

    this.resetSysColors();
    this.generateThemeFromStorage();
  }

  changeSecondaryColor(color: string) {
    changeSecondaryColor(color);
    this.themeSeed.secondary.set(color);
    this.generateThemeFromStorage();
  }

  changeTertiaryColor(color: string) {
    changeTertiaryColor(color);
    this.themeSeed.tertiary.set(color);
    this.generateThemeFromStorage();
  }

  changeErrorColor(color: string) {
    changeErrorColor(color);
    this.themeSeed.error.set(color);
    this.generateThemeFromStorage();
  }

  changeNeutralColor(color: string) {
    changeNeutralColor(color);
    this.themeSeed.neutral.set(color);
    this.generateThemeFromStorage();
  }

  changeNeutralVariantColor(color: string) {
    changeNeutralVariantColor(color);
    this.themeSeed['neutral-variant'].set(color);
    this.generateThemeFromStorage();
  }

  themeChanger(sysColorName: MaterialColorName, color: string) {
    this.theme[sysColorName]!.set(color);
    changeSysColor(sysColorName, color);
  }

  resetSysColors() {
    resetSysColors();
    this.changeColorMode(this.colorMode());
  }

  getURL() {
    return (
      window.location.origin +
      `/?${queryString.stringify(getCurrentThemePalette()!)}`
    );
  }
}

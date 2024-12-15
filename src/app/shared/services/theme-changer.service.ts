import {Injectable, signal} from '@angular/core';
import {
  argbFromHex,
  Hct,
  hexFromArgb,
  MaterialDynamicColors,
  SchemeTonalSpot as SchemeFunction
} from '@material/material-color-utilities';

export const DEFAULT_THEME_COLORS: ThemePalette = {
  primary: '#2879c6',
  secondary: '#302c2d',
  tertiary: '#1a2d40',
  error: '#FF5449',
  neutral: '#938F94',
  'neutral-variant': '#948F99',
};

@Injectable({providedIn: 'root'})
export class ThemeChangerService {
  private readonly THEME_KEY = 'theme-mode';

  themeSeed = {
    primary: signal(DEFAULT_THEME_COLORS.primary),
    secondary: signal(DEFAULT_THEME_COLORS.secondary),
    tertiary: signal(DEFAULT_THEME_COLORS.tertiary),
    error: signal(DEFAULT_THEME_COLORS.error),
    neutral: signal(DEFAULT_THEME_COLORS.neutral),
    'neutral-variant': signal(DEFAULT_THEME_COLORS['neutral-variant']),
  };

  colorMode = signal<ColorMode>(this.getStoredThemeMode());

  constructor() {
    this.applyColorThemeListeners();
    this.initializeTheme();
  }

  private getStoredThemeMode(): ColorMode {
    const storedMode = localStorage.getItem(this.THEME_KEY) as ColorMode;
    console.log(`[ThemeChangerService] Stored theme mode: ${storedMode}`);
    return storedMode || 'auto';
  }

  private saveThemeMode(mode: ColorMode): void {
    console.log(`[ThemeChangerService] Saving theme mode: ${mode}`);
    localStorage.setItem(this.THEME_KEY, mode);
  }

  applyColorThemeListeners() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply the current system preference on initialization
    if (this.colorMode() === 'auto') {
      console.log('[ThemeChangerService] Initial system preference detected. Applying auto mode.');
      this.applyAutoMode();
    }

    // Listen for system preference changes
    mediaQuery.addEventListener('change', () => {
      if (this.colorMode() === 'auto') {
        console.log('[ThemeChangerService] System preference changed. Reapplying auto mode.');
        this.applyAutoMode();
      }
    });
  }

  initializeTheme() {
    console.log(`[ThemeChangerService] Initializing theme with mode: ${this.colorMode()}`);
    if (this.colorMode() === 'auto') {
      this.applyAutoMode();
    } else {
      this.changeColorMode(this.colorMode());
    }
  }

  applyAutoMode() {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(`[ThemeChangerService] Auto mode detected. System prefers ${isDark ? 'dark' : 'light'} mode.`);
    this.applyTheme(this.themeSeed.primary(), isDark ? 'dark' : 'light');
    this.saveThemeMode('auto'); // Keep the storage value as 'auto'
  }

  changeColorMode(mode: ColorMode) {
    console.log(`[ThemeChangerService] Changing color mode to: ${mode}`);
    this.colorMode.set(mode);
    this.saveThemeMode(mode);

    if (mode === 'auto') {
      console.log('[ThemeChangerService] Auto mode selected. Checking system preference.');
      this.applyAutoMode();
    } else {
      this.applyTheme(this.themeSeed.primary(), mode);
    }
  }


  applyTheme(color: string, mode: ColorMode) {
    const isDark = mode === 'dark';
    console.log(`[ThemeChangerService] Applying theme. Color: ${color}, Mode: ${mode}`);
    const theme = this.generateTheme(color, isDark);
    applyTheme(theme);
  }

  generateTheme(color: string, isDark: boolean): AppTheme {
    console.log(`[ThemeChangerService] Generating theme for color: ${color}, IsDark: ${isDark}`);
    return {
      ...themeFromSourceColor(color, isDark),
      ...this.getAdditionalPalettes(isDark),
    };
  }

  getAdditionalPalettes(isDark: boolean) {
    console.log(`[ThemeChangerService] Generating additional palettes for isDark: ${isDark}`);
    return {
      ...secondaryPaletteFromSourceColor(this.themeSeed.secondary(), isDark),
      ...tertiaryPaletteFromSourceColor(this.themeSeed.tertiary(), isDark),
      ...errorPaletteFromSourceColor(this.themeSeed.error(), isDark),
      ...neutralPaletteFromSourceColor(this.themeSeed.neutral(), isDark),
      ...neutralVariantPaletteFromSourceColor(this.themeSeed['neutral-variant'](), isDark),
    };
  }
}


export const onlyPrimaryMaterialColors = {
  primary: MaterialDynamicColors.primary,
  'on-primary': MaterialDynamicColors.onPrimary,
  'primary-container': MaterialDynamicColors.primaryContainer,
  'on-primary-container': MaterialDynamicColors.onPrimaryContainer,
  'inverse-primary': MaterialDynamicColors.inversePrimary,
  'primary-fixed': MaterialDynamicColors.primaryFixed,
  'primary-fixed-dim': MaterialDynamicColors.primaryFixedDim,
  'on-primary-fixed': MaterialDynamicColors.onPrimaryFixed,
  'on-primary-fixed-variant': MaterialDynamicColors.onPrimaryFixedVariant,
};

export const neutralColors = {
  background: MaterialDynamicColors.background,
  'on-background': MaterialDynamicColors.onBackground,
  surface: MaterialDynamicColors.surface,
  'surface-dim': MaterialDynamicColors.surfaceDim,
  'surface-bright': MaterialDynamicColors.surfaceBright,
  'surface-container-lowest': MaterialDynamicColors.surfaceContainerLowest,
  'surface-container-low': MaterialDynamicColors.surfaceContainerLow,
  'surface-container': MaterialDynamicColors.surfaceContainer,
  'surface-container-high': MaterialDynamicColors.surfaceContainerHigh,
  'surface-container-highest': MaterialDynamicColors.surfaceContainerHighest,
  'on-surface': MaterialDynamicColors.onSurface,
  'inverse-surface': MaterialDynamicColors.inverseSurface,
  'inverse-on-surface': MaterialDynamicColors.inverseOnSurface,
  shadow: MaterialDynamicColors.shadow,
  scrim: MaterialDynamicColors.scrim,
  neutral: MaterialDynamicColors.neutralPaletteKeyColor,
};

export const neutralVariantColors = {
  'surface-variant': MaterialDynamicColors.surfaceVariant,
  'on-surface-variant': MaterialDynamicColors.onSurfaceVariant,
  outline: MaterialDynamicColors.outline,
  'outline-variant': MaterialDynamicColors.outlineVariant,
  'neutral-variant': MaterialDynamicColors.neutralVariantPaletteKeyColor,
};

export const materialColors = {
  background: MaterialDynamicColors.background,
  'on-background': MaterialDynamicColors.onBackground,
  surface: MaterialDynamicColors.surface,
  'surface-dim': MaterialDynamicColors.surfaceDim,
  'surface-bright': MaterialDynamicColors.surfaceBright,
  'surface-container-lowest': MaterialDynamicColors.surfaceContainerLowest,
  'surface-container-low': MaterialDynamicColors.surfaceContainerLow,
  'surface-container': MaterialDynamicColors.surfaceContainer,
  'surface-container-high': MaterialDynamicColors.surfaceContainerHigh,
  'surface-container-highest': MaterialDynamicColors.surfaceContainerHighest,
  'on-surface': MaterialDynamicColors.onSurface,
  'surface-variant': MaterialDynamicColors.surfaceVariant,
  'on-surface-variant': MaterialDynamicColors.onSurfaceVariant,
  'inverse-surface': MaterialDynamicColors.inverseSurface,
  'inverse-on-surface': MaterialDynamicColors.inverseOnSurface,
  outline: MaterialDynamicColors.outline,
  'outline-variant': MaterialDynamicColors.outlineVariant,
  shadow: MaterialDynamicColors.shadow,
  scrim: MaterialDynamicColors.scrim,
  'surface-tint': MaterialDynamicColors.surfaceTint,
  primary: MaterialDynamicColors.primary,
  'on-primary': MaterialDynamicColors.onPrimary,
  'primary-container': MaterialDynamicColors.primaryContainer,
  'on-primary-container': MaterialDynamicColors.onPrimaryContainer,
  'inverse-primary': MaterialDynamicColors.inversePrimary,
  secondary: MaterialDynamicColors.secondary,
  'on-secondary': MaterialDynamicColors.onSecondary,
  'secondary-container': MaterialDynamicColors.secondaryContainer,
  'on-secondary-container': MaterialDynamicColors.onSecondaryContainer,
  tertiary: MaterialDynamicColors.tertiary,
  'on-tertiary': MaterialDynamicColors.onTertiary,
  'tertiary-container': MaterialDynamicColors.tertiaryContainer,
  'on-tertiary-container': MaterialDynamicColors.onTertiaryContainer,
  error: MaterialDynamicColors.error,
  'on-error': MaterialDynamicColors.onError,
  'error-container': MaterialDynamicColors.errorContainer,
  'on-error-container': MaterialDynamicColors.onErrorContainer,
  neutral: MaterialDynamicColors.neutralPaletteKeyColor,
  'neutral-variant': MaterialDynamicColors.neutralVariantPaletteKeyColor,
  'primary-fixed': MaterialDynamicColors.primaryFixed,
  'primary-fixed-dim': MaterialDynamicColors.primaryFixedDim,
  'on-primary-fixed': MaterialDynamicColors.onPrimaryFixed,
  'on-primary-fixed-variant': MaterialDynamicColors.onPrimaryFixedVariant,
  'secondary-fixed': MaterialDynamicColors.secondaryFixed,
  'secondary-fixed-dim': MaterialDynamicColors.secondaryFixedDim,
  'on-secondary-fixed': MaterialDynamicColors.onSecondaryFixed,
  'on-secondary-fixed-variant': MaterialDynamicColors.onSecondaryFixedVariant,
  'tertiary-fixed': MaterialDynamicColors.tertiaryFixed,
  'tertiary-fixed-dim': MaterialDynamicColors.tertiaryFixedDim,
  'on-tertiary-fixed': MaterialDynamicColors.onTertiaryFixed,
  'on-tertiary-fixed-variant': MaterialDynamicColors.onTertiaryFixedVariant,
};


export function themeFromSourceColor(color: string, isDark: boolean): AppTheme {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(materialColors)) {
    theme[key] = hexFromArgb(value.getArgb(scheme));
  }
  return theme as AppTheme;
}

export function secondaryPaletteFromSourceColor(
  color: string,
  isDark: boolean
): AppTheme {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(onlyPrimaryMaterialColors)) {
    theme[key.replace('primary', 'secondary')] = hexFromArgb(
      value.getArgb(scheme)
    );
  }
  return theme as AppTheme;
}

export function tertiaryPaletteFromSourceColor(color: string, isDark: boolean) {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(onlyPrimaryMaterialColors)) {
    theme[key.replace('primary', 'tertiary')] = hexFromArgb(
      value.getArgb(scheme)
    );
  }
  return theme as AppTheme;
}

export function errorPaletteFromSourceColor(color: string, isDark: boolean) {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(onlyPrimaryMaterialColors)) {
    theme[key.replace('primary', 'error')] = hexFromArgb(value.getArgb(scheme));
  }
  return theme as AppTheme;
}

export function neutralPaletteFromSourceColor(color: string, isDark: boolean) {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(neutralColors)) {
    theme[key] = hexFromArgb(value.getArgb(scheme));
  }
  return theme as AppTheme;
}

export function neutralVariantPaletteFromSourceColor(
  color: string,
  isDark: boolean
) {
  const scheme = new SchemeFunction(Hct.fromInt(argbFromHex(color)), isDark, 0);
  const theme: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(neutralVariantColors)) {
    theme[key] = hexFromArgb(value.getArgb(scheme));
  }
  return theme as AppTheme;
}

export function applyTheme(theme: AppTheme, ssName = 'material-theme') {
  const styleString = generateCSSFromTheme(theme);
  applyThemeString(document, styleString, ssName);
}

export function generateCSSFromTheme(theme: AppTheme) {
  let styleString = ':root,:host{';
  for (const [key, value] of Object.entries(theme)) {
    styleString += `--sys-${key}:${value};`;
  }
  styleString += '}';
  return styleString;
}

export function applyThemeString(
  doc: DocumentOrShadowRoot,
  themeString: string,
  ssName = 'material-theme'
) {
  let sheet = (globalThis as WithStylesheet)[ssName];
  if (!sheet) {
    sheet = new CSSStyleSheet();
    (globalThis as WithStylesheet)[ssName] = sheet;
    doc.adoptedStyleSheets.push(sheet);
  }

  const surfaceContainer = themeString.match(
    /--sys-surface-container:(.+?);/
  )?.[1];
  if (surfaceContainer) {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', surfaceContainer);
  }

  sheet.replaceSync(themeString);
  localStorage.setItem(ssName, themeString);
}


export interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  neutral: string;
  'neutral-variant': string;
}


export type AppTheme<V = string> = Record<MaterialColorName, V>;

export type ColorMode = 'light' | 'dark' | 'auto';


export interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  neutral: string;
  'neutral-variant': string;
}

export type WithStylesheet = typeof globalThis & {
  [stylesheetName: string]: CSSStyleSheet | undefined;
};
export type MaterialColorName = keyof typeof materialColors;

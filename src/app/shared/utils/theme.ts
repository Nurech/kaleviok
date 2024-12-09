import {AppTheme, ColorMode} from '../types';
import {
  applyTheme,
  errorPaletteFromSourceColor,
  neutralPaletteFromSourceColor,
  neutralVariantPaletteFromSourceColor,
  secondaryPaletteFromSourceColor,
  tertiaryPaletteFromSourceColor,
  themeFromSourceColor,
} from './material-color-helpers';

/**
 * Generates a Material Theme from a given color and dark mode boolean, and
 * applies the theme to the document and lets the app know that the theme has
 * changed.
 *
 * @param color The source color to generate the theme.
 * @param isDark Whether or not the theme should be in dark mode.
 */
function applyThemeFromColor(color: string, isDark: boolean) {
  const theme = generateAndSaveTheme(color, isDark);
  applyTheme(theme);
}

function generateAndSaveTheme(color: string, isDark: boolean) {
  const theme = themeFromSourceColor(color, isDark);
  saveThemeObject(theme);
  return theme;
}

function applySecondaryPaletteFromColor(color: string, isDark: boolean) {
  const secondaryPalette = secondaryPaletteFromSourceColor(color, isDark);
  const theme = {
    ...getCurrentThemePalette(),
    ...secondaryPalette,
  };
  saveThemeObject(theme);
  applyTheme(theme);
}

function applyTertiaryPaletteFromColor(color: string, isDark: boolean) {
  const tertiaryPalette = tertiaryPaletteFromSourceColor(color, isDark);
  const theme = {
    ...getCurrentThemePalette(),
    ...tertiaryPalette,
  };
  saveThemeObject(theme);
  applyTheme(theme);
}

function applyErrorPaletteFromColor(color: string, isDark: boolean) {
  const errorPalette = errorPaletteFromSourceColor(color, isDark);
  const theme = {
    ...getCurrentThemePalette(),
    ...errorPalette,
  };
  saveThemeObject(theme);
  applyTheme(theme);
}

function applyNeutralPaletteFromColor(color: string, isDark: boolean) {
  const neutralPalette = neutralPaletteFromSourceColor(color, isDark);
  const theme = {
    ...getCurrentThemePalette(),
    ...neutralPalette,
  };
  saveThemeObject(theme);
  applyTheme(theme);
}

function applyNeutralVariantPaletteFromColor(color: string, isDark: boolean) {
  const neutralVariantPalette = neutralVariantPaletteFromSourceColor(
    color,
    isDark
  );
  const theme = {
    ...getCurrentThemePalette(),
    ...neutralVariantPalette,
  };
  saveThemeObject(theme);
  applyTheme(theme);
}

/**
 * Determines whether or not the mode should be Dark. This also means
 * calculating whether it should be dark if the current mode is 'auto'.
 *
 * @param mode The current color mode 'light', 'dark', or 'auto'.
 * @param saveAutoMode (Optional) Whether or not to save last auto mode to
 *     localstorage. Set to false if you simply want to query whether auto mode
 *     is dark or not. Defaults to true.
 * @return Whether or not the dark mode color tokens should apply.
 */
export function isModeDark(mode: ColorMode, saveAutoMode = true) {
  let isDark = mode === 'dark';

  // Determines whether the auto mode should display light or dark.
  if (mode === 'auto') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saveAutoMode) {
      // We have to save this because if the user closes the tab when it's light
      // and reopens it when it's dark, we need to know whether the last applied
      // 'auto' mode was correct.
      saveLastSavedAutoColorMode(isDark ? 'dark' : 'light');
    }
  }

  return isDark;
}

/**
 * Gets the current stringified material theme css string from localstorage.
 *
 * @return The current stringified material theme css string.
 */
export function getCurrentThemeString(): string | null {
  return localStorage.getItem('material-theme');
}

/**
 * Gets the current color mode from localstorage.
 *
 * @return The current color mode.
 */
export function getCurrentMode(): ColorMode | null {
  return localStorage.getItem('color-mode') as ColorMode | null;
}

/**
 * Saves the given color mode to localstorage.
 *
 * @param mode The color mode to save to localstorage.
 */
export function saveColorMode(mode: ColorMode) {
  localStorage.setItem('color-mode', mode);
}

/**
 * Gets the current seed color from localstorage.
 *
 * @return The current seed color.
 */
export function getCurrentSeedColor(): string | null {
  return localStorage.getItem('seed-color');
}

/**
 * Saves the given seed color to localstorage.
 *
 * @param color The seed color to save to local storage.
 */
export function saveSeedColor(color: string) {
  localStorage.setItem('seed-color', color);
}

export function getCurrentSecondaryColor(): string | null {
  return localStorage.getItem('secondary-color');
}

export function saveSecondaryColor(color: string) {
  localStorage.setItem('secondary-color', color);
}

export function getCurrentTertiaryColor(): string | null {
  return localStorage.getItem('tertiary-color');
}

export function saveTertiaryColor(color: string) {
  localStorage.setItem('tertiary-color', color);
}

export function getCurrentErrorColor(): string | null {
  return localStorage.getItem('error-color');
}

export function saveErrorColor(color: string) {
  localStorage.setItem('error-color', color);
}

export function getCurrentNeutralColor(): string | null {
  return localStorage.getItem('neutral-color');
}

export function saveNeutralColor(color: string) {
  localStorage.setItem('neutral-color', color);
}

export function getCurrentNeutralVariantColor(): string | null {
  return localStorage.getItem('neutral-variant-color');
}

export function saveNeutralVariantColor(color: string) {
  localStorage.setItem('neutral-variant-color', color);
}

export function getCurrentThemePalette(): AppTheme | null {
  return JSON.parse(localStorage.getItem('theme') ?? 'null');
}

export function saveThemeObject(theme: AppTheme) {
  localStorage.setItem('theme', JSON.stringify(theme));
}

export function saveSysColor(sysColorName: string, color: string) {
  const json = getSysColor();
  json[sysColorName] = color;

  localStorage.setItem('sys-colors', JSON.stringify(json));
}

export function getSysColor(sysColorName?: string) {
  const json = JSON.parse(localStorage.getItem('sys-colors') ?? '{}');

  if (sysColorName) {
    return json[sysColorName];
  }

  return json;
}

export function resetSysColors() {
  localStorage.setItem('sys-colors', '{}');
}

/**
 * Gets last applied color mode while in "auto" from localstorage.
 *
 * @return The last applied color mode while in "auto".
 */
export function getLastSavedAutoColorMode() {
  return localStorage.getItem('last-auto-color-mode') as
    | 'light'
    | 'dark'
    | null;
}

/**
 * Saves last applied color mode while in "auto" from localstorage.
 *
 * @param mode The last applied color mode while in "auto" to be saved to local
 *     storage.
 */
export function saveLastSavedAutoColorMode(mode: 'light' | 'dark') {
  localStorage.setItem('last-auto-color-mode', mode);
}

/**
 * Generates and applies a new theme due to a change in source color.
 *
 * @param color The new source color from which to generate the new theme.
 */
export function changeSeedColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applyThemeFromColor(color, isDark);
  saveSeedColor(color);
}

/**
 * Generates and applies only secondary palette to existing theme due to a change in secondary source color.
 *
 * @param color The new source color from which to generate the secondary palette theme.
 */
export function changeSecondaryColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applySecondaryPaletteFromColor(color, isDark);
  saveSecondaryColor(color);
}

export function changeTertiaryColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applyTertiaryPaletteFromColor(color, isDark);
  saveTertiaryColor(color);
}

export function changeErrorColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applyErrorPaletteFromColor(color, isDark);
  saveErrorColor(color);
}

export function changeNeutralColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applyNeutralPaletteFromColor(color, isDark);
  saveNeutralColor(color);
}

export function changeNeutralVariantColor(color: string) {
  const lastColorMode = getCurrentMode()!;
  const isDark = isModeDark(lastColorMode);

  resetSysColors();

  applyNeutralVariantPaletteFromColor(color, isDark);
  saveNeutralVariantColor(color);
}

/**
 * Generates and applies a new theme due to a change in color mode.
 *
 * @param mode The new color mode from which to generate the new theme.
 */
export function changeColorMode(mode: ColorMode) {
  const color = getCurrentSeedColor()!;
  const isDark = isModeDark(mode);

  let theme = themeFromSourceColor(color, isDark);

  const secondary = getCurrentSecondaryColor();
  const tertiary = getCurrentTertiaryColor();
  const neutral = getCurrentNeutralColor();
  const neutralVariant = getCurrentNeutralVariantColor();
  const error = getCurrentErrorColor();

  if (secondary) {
    theme = {
      ...theme,
      ...secondaryPaletteFromSourceColor(secondary, isDark),
    };
  }
  if (tertiary) {
    theme = {
      ...theme,
      ...tertiaryPaletteFromSourceColor(tertiary, isDark),
    };
  }
  if (error) {
    theme = {
      ...theme,
      ...errorPaletteFromSourceColor(error, isDark),
    };
  }
  if (neutral) {
    theme = {
      ...theme,
      ...neutralPaletteFromSourceColor(neutral, isDark),
    };
  }
  if (neutralVariant) {
    theme = {
      ...theme,
      ...neutralVariantPaletteFromSourceColor(neutralVariant, isDark),
    };
  }

  saveThemeObject(theme);
  saveColorMode(mode);
  applyTheme(theme);
}

/**
 * Generates and applies a new theme due to a change in both source color and
 * color mode.
 *
 * @param color The new source color from which to generate the new theme.
 * @param mode The new color mode from which to generate the new theme.
 */
export function changeColorAndMode(color: string, mode: ColorMode) {
  const isDark = isModeDark(mode);

  resetSysColors();

  applyThemeFromColor(color, isDark);
  saveSeedColor(color);
  saveColorMode(mode);
}

export function changeSysColor(sysColorName: string, color: string) {
  const theme = {
    ...getCurrentThemePalette(),
    ...{[sysColorName]: color},
  } as AppTheme;
  saveSysColor(sysColorName, color);
  saveThemeObject(theme);
  applyTheme(theme);
}

import {materialColors} from './app/shared/utils/constants';

export interface ThemePalette {
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  neutral: string;
  'neutral-variant': string;
}


export type MaterialColorName = keyof typeof materialColors;

/**
 * A theme mapping of token name (not custom property name) to stringified CSS
 * value.
 */
export type AppTheme<V = string> = Record<MaterialColorName, V>;

/** Color mode, either overriding light/dark or the user's preference. */
export type ColorMode = 'light' | 'dark' | 'auto';

interface M2ThemePaletteColor {
  name: string;
  hex: string;
  darkContrast: boolean;
}

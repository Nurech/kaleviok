import {materialColors} from './utils/constants';

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
export type AppTheme<V = string> = Record<MaterialColorName, V>;
export type ColorMode = 'light' | 'dark' | 'auto';

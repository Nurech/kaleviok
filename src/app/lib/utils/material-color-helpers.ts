import {
  argbFromHex,
  Hct,
  hexFromArgb,
  SchemeTonalSpot as SchemeFunction
} from '@material/material-color-utilities';
import { applyThemeString } from './apply-theme-string';
import {
  materialColors,
  neutralColors,
  neutralVariantColors,
  onlyPrimaryMaterialColors,
} from './constants';
import { AppTheme } from '../types';

export function hctFromHex(value: string) {
  return Hct.fromInt(argbFromHex(value));
}

export function hexFromKeyColor(hct: Hct) {
  const value = hct.toInt();
  return hexFromArgb(value);
}

export function hexFromHct(hue: number, chroma: number, tone: number) {
  const hct = Hct.from(hue, chroma, tone);
  const value = hct.toInt();
  return hexFromArgb(value);
}

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
  let styleString = generateCSSFromTheme(theme);

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

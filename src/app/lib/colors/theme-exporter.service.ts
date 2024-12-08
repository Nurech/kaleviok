import { Injectable } from '@angular/core';
import tinycolor, { ColorFormats, Instance } from 'tinycolor2';
import { M2ThemePalette } from '../types';

@Injectable({ providedIn: 'root' })
export class ThemeExporterService {
  exportM2Theme(primary: string, accent: string, error: string) {
    const primaryPalette = this.getPalette(primary, 'primary');
    const accentPalette = this.getPalette(accent, 'accent');
    const errorPalette = this.getPalette(error, 'error');

    return (
      this.createMTwoPaletteCode(primaryPalette) +
      '\n\n' +
      this.createMTwoPaletteCode(accentPalette) +
      '\n\n' +
      this.createMTwoPaletteCode(errorPalette)
    );
  }

  getPalette(hex: string, name: string): M2ThemePalette {
    const baseLight = tinycolor('#ffffff');
    const baseDark = this.multiply(
      tinycolor(hex).toRgb(),
      tinycolor(hex).toRgb()
    );
    const baseTriad = tinycolor(hex).tetrad();
    return {
      name,
      colors: [
        this.getColorObject(tinycolor.mix(baseLight, hex, 12), '50'),
        this.getColorObject(tinycolor.mix(baseLight, hex, 30), '100'),
        this.getColorObject(tinycolor.mix(baseLight, hex, 50), '200'),
        this.getColorObject(tinycolor.mix(baseLight, hex, 70), '300'),
        this.getColorObject(tinycolor.mix(baseLight, hex, 85), '400'),
        this.getColorObject(tinycolor.mix(baseLight, hex, 100), '500'),
        this.getColorObject(tinycolor.mix(baseDark, hex, 87), '600'),
        this.getColorObject(tinycolor.mix(baseDark, hex, 70), '700'),
        this.getColorObject(tinycolor.mix(baseDark, hex, 54), '800'),
        this.getColorObject(tinycolor.mix(baseDark, hex, 25), '900'),
        this.getColorObject(
          tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(65),
          'A100'
        ),
        this.getColorObject(
          tinycolor.mix(baseDark, baseTriad[3], 15).saturate(80).lighten(55),
          'A200'
        ),
        this.getColorObject(
          tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(45),
          'A400'
        ),
        this.getColorObject(
          tinycolor.mix(baseDark, baseTriad[3], 15).saturate(100).lighten(40),
          'A700'
        ),
      ],
    };
  }

  multiply(rgb1: ColorFormats.RGBA, rgb2: ColorFormats.RGBA) {
    rgb1.b = Math.floor((rgb1.b * rgb2.b) / 255);
    rgb1.g = Math.floor((rgb1.g * rgb2.g) / 255);
    rgb1.r = Math.floor((rgb1.r * rgb2.r) / 255);
    return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
  }

  getColorObject(value: Instance, name: string) {
    var c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight(),
    };
  }

  createMTwoPaletteCode(palette: M2ThemePalette) {
    let code = '';
    code += `$m2-${palette.name}: (\n`;
    palette.colors.forEach((color) => {
      code +=
        '    ' +
        color.name +
        ' : ' +
        tinycolor(color.hex).toHexString() +
        ',\n';
    });
    code += '    contrast: (\n';
    palette.colors.forEach((color) => {
      let contrast = '#ffffff';
      if (color.darkContrast) contrast = '#000000';
      code += '        ' + color.name + ' : ' + contrast + ',\n';
    });
    code += '    )\n';
    code += ');\n\n';
    return code;
  }
}

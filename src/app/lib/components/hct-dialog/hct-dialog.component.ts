import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';

import { hctFromHex, hexFromHct } from '../../utils/material-color-helpers';

export interface HctDialogData {
  label: string;
  value: string;
}

interface ColorFormGroup {
  hex: FormControl<string>;
  hue: FormControl<number>;
  chroma: FormControl<number>;
  tone: FormControl<number>;
}

@Component({
  selector: 'app-hct-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatSliderModule,
    MatIconModule,
  ],
  templateUrl: './hct-dialog.component.html',
  styleUrl: './hct-dialog.component.scss',
})
export class HctDialogComponent {
  public dialogRef = inject(MatDialogRef<HctDialogComponent>);
  public data = inject<HctDialogData>(MAT_DIALOG_DATA);

  control = new FormGroup<ColorFormGroup>({
    hex: new FormControl('', { nonNullable: true }),
    hue: new FormControl(0, { nonNullable: true }),
    chroma: new FormControl(0, { nonNullable: true }),
    tone: new FormControl(0, { nonNullable: true }),
  });

  get hexColor() {
    return this.control.get('hex')!.value;
  }
  get hue() {
    return this.control.get('hue')!.value;
  }
  set hue(value) {
    this.control.get('hue')!.setValue(value, { onlySelf: true });
  }
  get chroma() {
    return this.control.get('chroma')!.value;
  }
  set chroma(value) {
    this.control.get('chroma')!.setValue(value, { onlySelf: true });
  }
  get tone() {
    return this.control.get('tone')!.value;
  }
  set tone(value) {
    this.control.get('tone')?.setValue(value, { onlySelf: true });
  }

  constructor() {
    const hexColorControl = this.control.get('hex')!;
    const hueControl = this.control.get('hue')!;
    const chromaControl = this.control.get('chroma')!;
    const toneControl = this.control.get('tone')!;

    hexColorControl.setValue(this.data.value);
    this.updateHctFromHex(this.data.value);

    merge(
      hueControl.valueChanges,
      chromaControl.valueChanges,
      toneControl.valueChanges
    ).subscribe(() => {
      hexColorControl?.setValue(hexFromHct(this.hue, this.chroma, this.tone));
    });
  }

  onHexInputChange(ev: Event) {
    const hexValue = (ev.target as HTMLInputElement).value;
    this.updateHctFromHex(hexValue);
  }

  private updateHctFromHex(hexColor: string) {
    const hct = hctFromHex(hexColor);
    this.control.get('hue')?.setValue(hct.hue, { emitEvent: false });
    this.control.get('chroma')?.setValue(hct.chroma, { emitEvent: false });
    this.control.get('tone')?.setValue(hct.tone, { emitEvent: false });
  }
}

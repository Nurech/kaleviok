import {booleanAttribute, Component, effect, inject, input, output,} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {argbFromHex} from '@material/material-color-utilities';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {HctDialogComponent, HctDialogData,} from '../hct-dialog/hct-dialog.component';
import {CopyToClipboardDirective} from '../../../shared/directives/copy-to-clipboard.directive';
import {MatTooltipModule} from '@angular/material/tooltip';
import {getRandomColor} from '../../utils/random-color';

export function forbiddenColorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      argbFromHex(control.value);
      return null;
    } catch (error) {
      // console.error(error);
      return { forbiddenColor: { value: control.value } };
    }
  };
}

@Component({
  selector: 'lib-color-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CopyToClipboardDirective,
    MatTooltipModule,
    MatTooltipModule
  ],
  templateUrl: './color-input.component.html',
  styleUrl: './color-input.component.scss',
})
export class ColorInputComponent {
  label = input.required<string>();
  value = input<string>();
  showRandomBtn = input(false, { transform: booleanAttribute });
  valueChanged = output<string>();

  hex = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required, forbiddenColorValidator()],
  });

  private dialog = inject(MatDialog);

  get hexValue() {
    return this.hex.value;
  }

  constructor() {
    this.hex.valueChanges.subscribe((v) => {
      if (this.hex.valid) {
        this.valueChanged.emit(v);
      }
    });

    effect(() => {
      const value = this.value();

      if (value && value !== this.hexValue) {
        this.hex.setValue(value, { emitEvent: false });
      }
    });
  }

  openHCT() {
    const data: HctDialogData = {
      value: this.hexValue,
      label: this.label(),
    };
    const dialogRef = this.dialog.open(HctDialogComponent, {
      data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((v) => {
      if (v) {
        this.hex.setValue(v);
      }
    });
  }

  randomColor() {
    this.hex.setValue(getRandomColor());
  }
}

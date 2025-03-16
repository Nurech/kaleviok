import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AppFile, FileStatus } from '../../store/files/files.model';

export class ValidatorsCustom {
    static match(controlName: string, matchingControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const control = formGroup.get(controlName);
            const matchingControl = formGroup.get(matchingControlName);

            if (!control || !matchingControl) {
                return null;
            }

            if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
                return null;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
                return { mustMatch: true };
            } else {
                matchingControl.setErrors(null);
                return null;
            }
        };
    }

    static validateFilesAllUploaded: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const formArray = control as FormArray;
        const files: AppFile[] = formArray.value;

        if (!files || files.length === 0) return null;

        const allUploaded = files.every((file) => file.status === FileStatus.UPLOADED);
        return allUploaded ? null : { notAllUploaded: true };
    };

    static maxItems(maxItems: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!(control instanceof FormArray)) {
                return null;
            }
            return control.length > maxItems ? { maxFilesExceeded: true } : null;
        };
    }
}

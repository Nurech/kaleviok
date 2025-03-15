import { Component, computed, inject, signal, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ValidatorsCustom } from '../../../shared/validators/validators-custom';
import { emailRegisterStart } from '../../../store/auth/auth.actions';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatButton, MatIcon, TranslatePipe, MatDivider, MatIconButton, NgIf, ReactiveFormsModule],
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    fb = inject(FormBuilder);
    translate = inject(TranslateService);
    store$ = inject(Store);

    registerForm: FormGroup = this.fb.group(
        {
            email: new FormControl<string>('partsjoosep@gmail.com', [Validators.required, Validators.email]),
            password: new FormControl<string>('123123', [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl<string>('123123', [Validators.required, Validators.minLength(6)])
        },
        { validators: ValidatorsCustom.match('password', 'confirmPassword') }
    );

    emailSignal: Signal<string | null>;
    passwordSignal: Signal<string | null>;
    confirmPasswordSignal: Signal<string | null>;
    passwordsMatchSignal: Signal<boolean>;
    hidePassword = signal(true);

    constructor() {
        this.emailSignal = toSignal(this.registerForm.get('email')?.valueChanges.pipe(debounceTime(300)) ?? of(null), {
            initialValue: this.registerForm.get('email')?.value ?? null
        });

        this.passwordSignal = toSignal(this.registerForm.get('password')?.valueChanges.pipe(debounceTime(300)) ?? of(null), {
            initialValue: this.registerForm.get('password')?.value ?? null
        });

        this.confirmPasswordSignal = toSignal(this.registerForm.get('confirmPassword')?.valueChanges.pipe(debounceTime(300)) ?? of(null), {
            initialValue: this.registerForm.get('confirmPassword')?.value ?? null
        });

        this.passwordsMatchSignal = computed(() => {
            const password = this.registerForm.get('password')?.value;
            const confirmPassword = this.registerForm.get('confirmPassword')?.value;
            return password === confirmPassword && !!password && !!confirmPassword;
        });
    }

    emailErrorMessage(): string {
        const emailControl = this.registerForm.get('email');
        if (emailControl?.hasError('required')) {
            return this.translate.instant('email_required');
        }
        if (emailControl?.hasError('email')) {
            return this.translate.instant('invalid_email');
        }
        return '';
    }

    passwordErrorMessage(): string {
        const passwordControl = this.registerForm.get('password');
        if (passwordControl?.hasError('required')) {
            return this.translate.instant('password_required');
        }
        if (passwordControl?.hasError('minlength')) {
            const requiredLength = passwordControl.errors?.['minlength']?.requiredLength;
            return this.translate.instant('password_minlength', { min: requiredLength });
        }
        return '';
    }

    confirmPasswordErrorMessage(): string {
        const confirmPasswordControl = this.registerForm.get('confirmPassword');
        if (confirmPasswordControl?.hasError('required')) {
            return this.translate.instant('confirm_password_required');
        }
        if (confirmPasswordControl?.hasError('minlength')) {
            const requiredLength = confirmPasswordControl.errors?.['minlength']?.requiredLength;
            return this.translate.instant('password_minlength', { min: requiredLength });
        }
        if (!this.passwordsMatchSignal()) {
            return this.translate.instant('passwords_do_not_match');
        }
        return '';
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const { email, password } = this.registerForm.value;
            this.store$.dispatch(emailRegisterStart({ email, password }));
        }
    }

    registerWithGoogle() {
        console.log('Registering with Google...');
    }
}

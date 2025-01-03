import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../store/auth/auth.service';
import { InfoComponent } from '../../../shared/components/info/info.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    TranslatePipe,
    MatDivider,
    MatCheckbox,
    MatIconButton,
    RouterLink,
    InfoComponent,
    AsyncPipe,
  ],
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  passwordsMatch = computed(
    () => this.password.value === this.confirmPassword.value && !!this.password.value && !!this.confirmPassword.value,
  );
  canRegister = computed(
    () => this.email.valid && this.password.valid && this.confirmPassword.valid && this.passwordsMatch(),
  );

  constructor() {
    effect(() => {
      if (this.password.value && this.confirmPassword.value) {
        console.log(`Passwords match: ${this.passwordsMatch()}`);
      }
    });
  }

  togglePasswordVisibility() {
    this.hidePassword.set(!this.hidePassword());
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
  }

  emailErrorMessage(): string {
    if (this.email.hasError('required')) return 'Email is required';
    if (this.email.hasError('email')) return 'Invalid email';
    return '';
  }

  passwordErrorMessage(): string {
    if (this.password.hasError('required')) return 'Password is required';
    if (this.password.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }

  confirmPasswordErrorMessage(): string {
    if (this.confirmPassword.hasError('required')) return 'Please confirm your password';
    if (!this.passwordsMatch()) return 'Passwords do not match';
    return '';
  }

  registerWithEmail() {
    if (this.canRegister()) {
      this.authService.registerWithEmail(this.email.value!, this.password.value!).subscribe(
        () => console.log('Registration successful'),
        (error) => console.error('Registration error:', error),
      );
    }
  }

  registerWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      () => console.log('Google registration successful'),
      (error) => console.error('Google registration error:', error),
    );
  }
}

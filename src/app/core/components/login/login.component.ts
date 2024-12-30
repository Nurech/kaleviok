import { Component, inject, signal, computed } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { emailStart, googleStart } from '../../../store/auth/auth.actions';
import { selectMySettings } from '../../../store/settings/settings.selectors';
import { updateSettings } from '../../../store/settings/settings.actions';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  store$ = inject(Store);
  mySettings$ = this.store$.select(selectMySettings);
  private translate = inject(TranslateService);

  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('', [Validators.required]);
  hide = signal(true);

  // Reactive signals for error messages
  emailErrorMessage = computed(() => {
    if (this.email.hasError('required')) {
      return this.translate.instant('email_is_required');
    } else if (this.email.hasError('email')) {
      return this.translate.instant('not_a_valid_email');
    }
    return '';
  });

  passwordErrorMessage = computed(() => {
    if (this.password.hasError('required')) {
      return this.translate.instant('password_is_required');
    }
    return '';
  });

  loginWithGoogle() {
    this.store$.dispatch(googleStart());
  }

  loginWithEmail() {
    if (this.email.valid && this.password.valid) {
      const email = this.email.value as string;
      const password = this.password.value as string;
      this.store$.dispatch(emailStart({ email, password }));
    }
  }

  togglePasswordVisibility() {
    this.hide.set(!this.hide());
  }

  rememberMe(checked: boolean) {
    this.store$.dispatch(updateSettings({ changes: { autologin: checked } }));
  }
}

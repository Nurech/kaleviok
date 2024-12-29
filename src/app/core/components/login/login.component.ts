import { Component, inject, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MatDivider } from '@angular/material/divider';
import { MatCheckbox } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { InfoComponent } from '../../../shared/components/info/info.component';
import { emailStart, gmailStart } from '../../../store/auth/auth.actions';
import { changeMySettings } from '../../../store/settings/settings.actions';
import { selectMySettings } from '../../../store/settings/settings.selectors';
import { selectMyUid } from '../../../store/auth/auth.selectors';

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
  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hide = signal(true);

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.emailErrorMessage.set(this.translate.instant('email_is_required'));
    } else if (this.email.hasError('email')) {
      this.emailErrorMessage.set(this.translate.instant('not_a_valid_email'));
    } else {
      this.emailErrorMessage.set('');
    }
  }

  loginWithGoogle() {
    this.store$.dispatch(gmailStart());
  }

  loginWithEmail() {
    if (this.email.valid && this.password.valid) {
      const email = this.email.value as string;
      const password = this.password.value as string;
      this.store$.dispatch(emailStart({ email, password }));
    }
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.passwordErrorMessage.set(this.translate.instant('password_is_required'));
    } else {
      this.passwordErrorMessage.set('');
    }
  }

  togglePasswordVisibility() {
    this.hide.set(!this.hide());
  }

  rememberMe(checked: boolean) {
    this.store$
      .select(selectMyUid)
      .pipe(take(1))
      .subscribe((uid) => {
        this.store$.dispatch(changeMySettings({ changes: { uid, autologin: checked } }));
      });
  }
}

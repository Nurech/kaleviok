import { inject, Injectable, signal, effect } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { autologin } from './auth.actions';
import { selectMySettings } from '../settings/settings.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private store$ = inject(Store);

  private authState = signal<User | null | undefined>(undefined);

  constructor() {
    this.initialize();
  }

  private initialize() {
    onAuthStateChanged(this.auth, (user) => {
      this.authState.set(user);
    });

    effect(() => {
      const user = this.authState();
      if (user === undefined) {
        console.log('Auth state is still loading');
        return;
      }

      if (user) {
        console.log('User authenticated:', user);
      } else {
        console.log('No authenticated user, dispatching autologin');
        this.store$
          .select(selectMySettings)
          .pipe(take(1))
          .subscribe((settings) => {
            if (settings.autologin && settings.loginMethod) {
              this.store$.dispatch(autologin({ payload: settings.loginMethod }));
            }
          });
      }
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }

  loginWithEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }

  getAuthState() {
    return this.authState();
  }
}

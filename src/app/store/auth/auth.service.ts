import { inject, Injectable, signal, effect } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { manualLogin, googleSuccess, startAutoLogin } from './auth.actions';
import { selectMySettings } from '../settings/settings.selectors';
import { UserMapper } from '../accounts/account.model';

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
    this.store$
      .select(selectMySettings)
      .pipe(take(1))
      .subscribe((settings) => {
        if (settings.autologin) {
          onAuthStateChanged(this.auth, (user) => {
            this.authState.set(user);
          });

          effect(
            () => {
              const user = this.authState();
              if (user === undefined) {
                console.log('Auth state is loading');
                this.store$.dispatch(startAutoLogin());
                return;
              }

              if (user) {
                console.log('User authenticated:', user);
                const account = UserMapper.mapFirebaseUserToUser(user);
                this.store$.dispatch(googleSuccess({ account }));
              }
            },
            { allowSignalWrites: true },
          );
        } else {
          console.log('No authenticated user, dispatching manual login');
          this.store$.dispatch(manualLogin());
        }
      });
  }

  registerWithEmail(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
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

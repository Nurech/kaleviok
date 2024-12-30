import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { BehaviorSubject, from } from 'rxjs';
import { filter, take, switchMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { autologin } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private store$ = inject(Store);
  private authState = new BehaviorSubject<User | null | undefined>(undefined);

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.authState.next(user);
    });

    this.tryAutoLogin();
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

  tryAutoLogin() {
    this.authState
      .pipe(
        filter((state) => state !== undefined),
        take(1),
        switchMap((user) => {
          if (user) {
            console.log('User authenticated:', user);
            return [];
          } else {
            console.log('No authenticated user, dispatching autologin');
            this.store$.dispatch(autologin());
            return [];
          }
        }),
        catchError((error) => {
          console.error('Error during auto-login attempt:', error);
          this.store$.dispatch(autologin());
          return [];
        }),
      )
      .subscribe();
  }
}

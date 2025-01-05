import { inject, Injectable, signal } from '@angular/core';
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
import { from } from 'rxjs';
import { Store } from '@ngrx/store';
import { authChanged } from './auth.actions';
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
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed', user);
      if (user) {
        this.setAuthState(user);
      } else {
        this.setAuthState(null);
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

  setAuthState(user: User | null) {
    this.authState.set(user);
    if (user) {
      this.store$.dispatch(authChanged({ payload: UserMapper.mapFirebaseUserToUser(user) }));
    }
  }
}

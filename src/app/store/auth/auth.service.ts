import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { autologin } from './auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private store$ = inject(Store);

  constructor() {
    // TODO race condition?
    setTimeout(() => {
      this.store$.dispatch(autologin());
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe();
  }

  loginWithEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return from(signOut(this.auth));
  }

  getCurrentUser(): Observable<User> {
    return user(this.auth);
  }
}

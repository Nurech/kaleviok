import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from '../../store/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe();
  }

  logout() {
    return from(signOut(this.auth));
  }

  getCurrentUser(): Observable<User> {
    return user(this.auth);
  }
}

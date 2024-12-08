import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe();
  }

  logout() {
    return from(signOut(this.auth));
  }

  getCurrentUser() {
    return user(this.auth);
  }

}

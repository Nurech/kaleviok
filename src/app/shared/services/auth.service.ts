import {Injectable} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup, signOut, user} from '@angular/fire/auth';
import {Firestore} from '@angular/fire/firestore';
import {from} from 'rxjs';

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

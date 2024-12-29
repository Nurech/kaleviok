import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);

  save(user: User) {
    console.warn('User saved:', user);
    const userRef = doc(this.firestore, `users/${user.uid}`);
    return setDoc(userRef, user, { merge: true });
  }
}

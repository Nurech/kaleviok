import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private firestore = inject(Firestore);

  save(account: Account): Observable<Account> {
    const userRef = doc(this.firestore, `accounts/${account.uid}`);
    return from(setDoc(userRef, account)).pipe(map(() => account));
  }

  update(account: Account): Observable<Account> {
    const userRef = doc(this.firestore, `accounts/${account.uid}`);
    return from(setDoc(userRef, account, { merge: true })).pipe(map(() => account));
  }

  get(uid: string): Observable<Account | null> {
    const userRef = doc(this.firestore, `accounts/${uid}`);
    return from(getDoc(userRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {
          return docSnap.data() as Account;
        }
        return null;
      }),
    );
  }
}

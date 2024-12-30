import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private firestore = inject(Firestore);

  save(account: Account): Observable<Account> {
    const userRef = doc(this.firestore, `accounts/${account.uid}`);
    return from(setDoc(userRef, account, { merge: true })).pipe(map(() => account));
  }
}

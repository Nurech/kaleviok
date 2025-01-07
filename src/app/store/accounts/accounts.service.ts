import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  onSnapshot,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Account } from './account.model';
import { loadAccountsSuccess } from './accounts.actions';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private firestore = inject(Firestore);
  private store$ = inject(Store);
  private collectionName = 'accounts';

  constructor() {
    console.log('Firestore instance:', this.firestore);
    this.getAllAccounts();
  }

  save(account: Account): Observable<Account> {
    const userRef = doc(this.firestore, `${this.collectionName}/${account.uid}`);
    return from(setDoc(userRef, account)).pipe(map(() => account));
  }

  update(account: Account): Observable<Account> {
    const userRef = doc(this.firestore, `${this.collectionName}/${account.uid}`);
    return from(setDoc(userRef, account, { merge: true })).pipe(map(() => account));
  }

  get(uid: string): Observable<Account | null> {
    const userRef = doc(this.firestore, `${this.collectionName}/${uid}`);
    return from(getDoc(userRef)).pipe(map((docSnap) => (docSnap.exists() ? (docSnap.data() as Account) : null)));
  }

  getAllAccounts(): void {
    const accountsCollection = collection(this.firestore, this.collectionName);
    const accountsQuery = query(accountsCollection, where('uid', '!=', null));

    onSnapshot(accountsQuery, (snapshot) => {
      const accounts = snapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() }) as Account);

      this.store$.dispatch(loadAccountsSuccess({ accounts }));
    });
  }
}

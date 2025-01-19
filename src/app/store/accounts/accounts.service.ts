import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc, query, where, onSnapshot, getDocs } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Account } from './account.model';
import { accountAdded, accountDeleted, accountModified } from './accounts.actions';

@Injectable({
    providedIn: 'root'
})
export class AccountsService {
    private firestore = inject(Firestore);
    private store$ = inject(Store);
    private collectionName = 'accounts';
    private collection = collection(this.firestore, this.collectionName);
    private unsubscribeListen?: () => void;

    save(account: Account): Observable<Account> {
        const userRef = doc(this.collection, account.uid);
        return from(setDoc(userRef, account)).pipe(map(() => account));
    }

    update(account: Account): Observable<Account> {
        const userRef = doc(this.collection, account.uid);
        return from(setDoc(userRef, account, { merge: true })).pipe(map(() => account));
    }

    get(uid: string): Observable<Account | null> {
        const userRef = doc(this.collection, uid);
        return from(getDoc(userRef)).pipe(map((docSnap) => (docSnap.exists() ? (docSnap.data() as Account) : null)));
    }

    getAll(): Observable<Account[] | null> {
        return from(getDocs(this.collection)).pipe(
            map((snapshot) => {
                if (snapshot.empty) {
                    return null;
                }
                return snapshot.docs.map(
                    (doc) =>
                        ({
                            uid: doc.id,
                            ...doc.data()
                        }) as Account
                );
            })
        );
    }

    startListen(): void {
        const accountsQuery = query(this.collection, where('uid', '!=', null));

        this.unsubscribeListen = onSnapshot(accountsQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const docData = { uid: change.doc.id, ...change.doc.data() } as Account;

                switch (change.type) {
                    case 'added':
                        this.store$.dispatch(accountAdded({ payload: docData }));
                        break;
                    case 'modified':
                        this.store$.dispatch(accountModified({ payload: docData }));
                        break;
                    case 'removed':
                        this.store$.dispatch(accountDeleted({ payload: docData }));
                        break;
                    default:
                        console.log(`${this.collectionName} Document default:`, docData);
                }
            });
        });
    }

    stopListen(): void {
        if (this.unsubscribeListen) {
            this.unsubscribeListen();
            this.unsubscribeListen = undefined;
            console.log(`${this.collectionName} listener stopped.`);
        } else {
            console.log(`${this.collectionName} listener is not active.`);
        }
    }
}

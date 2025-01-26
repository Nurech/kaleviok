import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
    Firestore,
    doc,
    setDoc,
    getDoc,
    collectionData,
    collection
} from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Setting } from './settings.model';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private store$ = inject(Store);
    private firestore = inject(Firestore);

    getUserSettings(): Observable<Setting[] | null> {
        return this.store$.pipe(
            select(selectAuthenticatedAccount),
            switchMap((user) => {
                if (!user) return of(null);
                const settingsCollectionRef = collection(this.firestore, `settings/${user.uid}/preferences`);
                return collectionData(settingsCollectionRef, { idField: 'uid' }) as Observable<Setting[]>;
            })
        );
    }

    upsert(uid: string, changes: Partial<Setting>): Observable<void> {
        const settingsCollectionRef = collection(this.firestore, `settings/${uid}/preferences`);

        const settingDocRef = changes.uid
            ? doc(this.firestore, `settings/${uid}/preferences/${changes.uid}`)
            : doc(settingsCollectionRef);

        return from(getDoc(settingDocRef)).pipe(
            switchMap((docSnap) => {
                const newChanges = { ...changes, uid: docSnap.exists() ? changes.uid : settingDocRef.id };
                return from(setDoc(settingDocRef, newChanges, { merge: true }));
            })
        );
    }
}

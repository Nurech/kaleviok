import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Firestore, doc, docData, updateDoc, setDoc, getDoc } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Settings, Setting } from './settings.model';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private store$ = inject(Store);
    private firestore = inject(Firestore);

    getUserSettings(): Observable<Settings | null> {
        return this.store$.pipe(
            select(selectAuthenticatedAccount),
            switchMap((user) => {
                if (!user) return of(null);
                const settingsDocRef = doc(this.firestore, `settings/${user.uid}`);
                return docData(settingsDocRef) as Observable<Settings | null>;
            })
        );
    }

    updateSetting(uid: string, changes: Partial<Setting>): Observable<void> {
        const settingDocRef = doc(this.firestore, `settings/${uid}`);

        return from(getDoc(settingDocRef)).pipe(
            switchMap((docSnap) => {
                if (docSnap.exists()) {
                    return from(updateDoc(settingDocRef, changes));
                } else {
                    return from(setDoc(settingDocRef, { uid, ...changes }));
                }
            })
        );
    }

    updateUserSettings(uid: string, settings: Settings): Observable<void> {
        const settingsDocRef = doc(this.firestore, `settings/${uid}`);
        return from(setDoc(settingsDocRef, settings));
    }
}

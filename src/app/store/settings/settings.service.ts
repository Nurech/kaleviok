import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, query, where, onSnapshot } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Setting } from './settings.model';
import { settingAdded, settingModified, settingDeleted } from './settings.actions';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private firestore = inject(Firestore);
    private store$ = inject(Store);
    private collectionName = 'settings';
    private collection = collection(this.firestore, this.collectionName);
    private listener?: () => void;

    constructor() {
        this.startListen();
    }

    // Save or Update Setting
    upsert(userId: string, changes: Partial<Setting>): Observable<void> {
        const settingId = changes.id || doc(collection(this.firestore, this.collectionName)).id;
        const settingDocRef = doc(this.firestore, `${this.collectionName}/${settingId}`);
        const settingData = { ...changes, id: settingId, uid: userId };
        return from(setDoc(settingDocRef, settingData, { merge: true }));
    }

    // Start Listener for Authenticated User
    startListen(): void {
        this.store$.pipe(select(selectAuthenticatedAccount)).subscribe((user) => {
            if (!user) {
                return;
            }
            console.log(`Settings listener started for user: ${user.uid}`);

            const settingsQuery = query(this.collection, where('uid', '==', user.uid));
            this.listener = onSnapshot(settingsQuery, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const docData = { id: change.doc.id, ...change.doc.data() } as Setting;

                    switch (change.type) {
                        case 'added':
                            this.store$.dispatch(settingAdded({ payload: docData }));
                            break;
                        case 'modified':
                            this.store$.dispatch(settingModified({ payload: docData }));
                            break;
                        case 'removed':
                            this.store$.dispatch(settingDeleted({ payload: docData }));
                            break;
                        default:
                            console.log(`${this.collectionName} Document default:`, docData);
                    }
                });
            });
        });
    }

    // Stop Listener
    stopListen(): void {
        if (this.listener) {
            this.listener();
            this.listener = undefined;
            console.log(`${this.collectionName} listener stopped.`);
        } else {
            console.log(`${this.collectionName} listener is not active.`);
        }
    }
}

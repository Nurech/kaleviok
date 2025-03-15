import { Injectable, inject } from '@angular/core';
import { Firestore, collection, query, where, onSnapshot } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppSetting } from './app-settings.model';
import { added, modified, removed } from './app-settings.actions';

@Injectable({
    providedIn: 'root'
})
export class AppSettingsService {
    private firestore = inject(Firestore);
    private store$ = inject(Store);
    private collectionName = 'appSettings';
    private collection = collection(this.firestore, this.collectionName);
    private listener?: () => void;

    startListen(): void {
        const settingsQuery = query(this.collection, where('ACTIVE', '==', true));
        console.log(`App Settings listener started.`);

        this.listener = onSnapshot(settingsQuery, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const docData = { id: change.doc.id, ...change.doc.data() } as AppSetting;

                switch (change.type) {
                    case 'added':
                        this.store$.dispatch(added({ payload: docData }));
                        break;
                    case 'modified':
                        this.store$.dispatch(modified({ id: docData.id, changes: docData }));
                        break;
                    case 'removed':
                        this.store$.dispatch(removed({ payload: docData }));
                        break;
                    default:
                        console.log(`${this.collectionName} Document default:`, docData);
                }
            });
        });
    }

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

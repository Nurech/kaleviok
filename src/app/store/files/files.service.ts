import { Injectable, inject } from '@angular/core';
import { Firestore, doc, deleteDoc, collection, getDocs, where, query, onSnapshot } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from '@angular/fire/storage';
import { Observable, from, map, firstValueFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppFile, FileStatus } from './files.model';
import { setDocClean } from '../../shared/interceptors/firebase-utils';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { addFile, updateFile, fileRefAdded, fileRefModified, fileRefDeleted } from './files.actions';

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    private firestore = inject(Firestore);
    private storage = inject(Storage);
    private collectionName = 'files';
    private store$ = inject(Store);
    private listener?: () => void;

    constructor() {
        this.startListen();
    }

    uploadFile(file: AppFile): Observable<AppFile> {
        const newFileDocRef = doc(collection(this.firestore, this.collectionName));
        const generatedUid = newFileDocRef.id;
        const filePath = `uploads/${generatedUid}`;
        const fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(fileRef, file.blob);

        const initialFileState: AppFile = {
            ...file,
            id: generatedUid,
            progress: 0,
            status: FileStatus.UPLOADING
        };

        this.store$.dispatch(addFile({ payload: initialFileState }));

        return new Observable<AppFile>((observer) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.store$.dispatch(updateFile({ fileId: generatedUid, changes: { progress } }));
                },
                (error) => observer.error(error),
                async () => {
                    try {
                        const account = await firstValueFrom(this.store$.select(selectAuthenticatedAccount));
                        if (!account?.uid) throw new Error('User not authenticated');

                        const url = await getDownloadURL(fileRef);
                        const metadata = await getMetadata(fileRef);

                        const uploadedFile: Partial<AppFile> = {
                            createdBy: account.uid,
                            name: file.name,
                            status: FileStatus.SCANNING, // Initially scanning before validation
                            thumbnail: url,
                            createdAt: new Date(metadata.timeCreated).toISOString(),
                            metadata,
                            progress: 100
                        };

                        this.store$.dispatch(updateFile({ fileId: generatedUid, changes: uploadedFile }));

                        await firstValueFrom(this.upsert({ ...initialFileState, ...uploadedFile }));
                        observer.next({ ...initialFileState, ...uploadedFile });
                        observer.complete();
                    } catch (error) {
                        observer.error(error);
                    }
                }
            );
        });
    }

    upsert(file: AppFile): Observable<AppFile> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${file.id}`);
        return from(setDocClean(fileDocRef, file, { merge: true })).pipe(map(() => file));
    }

    startListen(): void {
        this.store$.pipe(select(selectAuthenticatedAccount)).subscribe((user) => {
            if (!user?.uid) {
                console.log('No authenticated user found, stopping file listener.');
                this.stopListen();
                return;
            }

            console.log(`Files listener started for user: ${user.uid}`);

            const filesQuery = query(
                collection(this.firestore, this.collectionName),
                where('createdBy', '==', user.uid) // Filter by authenticated user
            );

            this.listener = onSnapshot(filesQuery, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const docData = { id: change.doc.id, ...change.doc.data() } as AppFile;

                    switch (change.type) {
                        case 'added':
                            this.store$.dispatch(fileRefAdded({ payload: docData }));
                            break;
                        case 'modified':
                            this.store$.dispatch(fileRefModified({ payload: docData }));
                            break;
                        case 'removed':
                            this.store$.dispatch(fileRefDeleted({ fileId: docData.id }));
                            break;
                        default:
                            console.log(`${this.collectionName} Document default:`, docData);
                    }
                });
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

    deleteFile(fileId: string): Observable<void> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${fileId}`);
        return from(deleteDoc(fileDocRef));
    }

    downloadFilesByEventId(eventId: string): Observable<AppFile[]> {
        const filesCollectionRef = collection(this.firestore, this.collectionName);
        const filesQuery = query(filesCollectionRef, where('eventId', '==', eventId));

        return from(getDocs(filesQuery)).pipe(map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as AppFile)));
    }
}

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, deleteDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from '@angular/fire/storage';
import { Observable, from, switchMap, map, throwError } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppFile, FileStatus } from './files.model';
import { setDocClean } from '../../shared/interceptors/firebase-utils';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class FilesService {
    private firestore = inject(Firestore);
    private storage = inject(Storage);
    private collectionName = 'files';
    private store$ = inject(Store);

    uploadFile(file: AppFile): Observable<AppFile> {
        const newFileDocRef = doc(collection(this.firestore, this.collectionName));
        const generatedUid = newFileDocRef.id;
        const filePath = `uploads/${generatedUid}`;
        const fileRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(fileRef, file.blob);

        return from(
            new Promise<void>((resolve, reject) => {
                uploadTask.on('state_changed', undefined, reject, resolve);
            })
        ).pipe(
            withLatestFrom(this.store$.select(selectAuthenticatedAccount)),
            switchMap(([, account]) => {
                if (!account?.uid) {
                    return throwError(() => new Error('User not authenticated'));
                }
                return from(getDownloadURL(fileRef)).pipe(map((url) => ({ url, accountId: account.uid })));
            }),
            switchMap(({ url, accountId }) =>
                from(getMetadata(fileRef)).pipe(map((metadata) => ({ url, metadata, accountId })))
            ),
            switchMap(({ url, metadata, accountId }) => {
                const uploadedFile: Partial<AppFile> = {
                    uid: generatedUid,
                    createdBy: accountId,
                    name: file.name,
                    status: FileStatus.UPLOADED,
                    thumbnail: url,
                    createdAt: new Date(metadata.timeCreated).toISOString(),
                    metadata
                };

                return this.upsert(uploadedFile as AppFile).pipe(map(() => uploadedFile as AppFile));
            })
        );
    }

    upsert(file: AppFile): Observable<AppFile> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${file.uid}`);
        return from(setDocClean(fileDocRef, file, { merge: true })).pipe(map(() => file));
    }

    getFileById(fileId: string): Observable<AppFile | null> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${fileId}`);
        return from(getDoc(fileDocRef)).pipe(
            map((docSnapshot) => (docSnapshot.exists() ? (docSnapshot.data() as AppFile) : null))
        );
    }

    deleteFile(fileId: string): Observable<void> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${fileId}`);
        return from(deleteDoc(fileDocRef));
    }
}

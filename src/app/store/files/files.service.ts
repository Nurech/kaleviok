import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, deleteDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from '@angular/fire/storage';
import { Observable, from, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppFile, FileStatus } from './files.model';
import { setDocClean } from '../../shared/interceptors/firebase-utils';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { addFile, updateFileProgress, updateFileStatus } from './files.actions';

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

        const initialFileState: AppFile = {
            ...file,
            uid: generatedUid,
            progress: 0,
            status: FileStatus.UPLOADING
        };

        this.store$.dispatch(addFile({ payload: initialFileState }));

        return new Observable<AppFile>((observer) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.store$.dispatch(updateFileProgress({ fileId: generatedUid, progress }));
                },
                (error) => observer.error(error),
                async () => {
                    try {
                        const account = await this.store$.select(selectAuthenticatedAccount).pipe().toPromise();
                        console.warn('account', account);
                        if (!account?.uid) throw new Error('User not authenticated');

                        const url = await getDownloadURL(fileRef);
                        const metadata = await getMetadata(fileRef);

                        const uploadedFile: AppFile = {
                            ...initialFileState,
                            createdBy: account.uid,
                            name: file.name,
                            status: FileStatus.UPLOADED,
                            thumbnail: url,
                            createdAt: new Date(metadata.timeCreated).toISOString(),
                            metadata,
                            progress: 100
                        };

                        this.store$.dispatch(updateFileStatus({ fileId: generatedUid, status: FileStatus.UPLOADED }));

                        await this.upsert(uploadedFile).toPromise();
                        observer.next(uploadedFile);
                        observer.complete();
                    } catch (error) {
                        observer.error(error);
                    }
                }
            );
        });
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

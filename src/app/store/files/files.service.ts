import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc, deleteDoc, collection, getDocs, where, query } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, getMetadata } from '@angular/fire/storage';
import { Observable, from, map, firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppFile, FileStatus } from './files.model';
import { setDocClean } from '../../shared/interceptors/firebase-utils';
import { selectAuthenticatedAccount } from '../auth/auth.selectors';
import { addFile, updateFile } from './files.actions';

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
                            status: FileStatus.UPLOADED,
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
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${file.uid}`);
        return from(setDocClean(fileDocRef, file, { merge: true })).pipe(map(() => file));
    }

    getFileById(fileId: string): Observable<AppFile | null> {
        const fileDocRef = doc(this.firestore, `${this.collectionName}/${fileId}`);
        return from(getDoc(fileDocRef)).pipe(map((docSnapshot) => (docSnapshot.exists() ? (docSnapshot.data() as AppFile) : null)));
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

import { FullMetadata } from '@angular/fire/storage';

export enum FileStatus {
    UPLOADING = 'UPLOADING',
    UPLOADED = 'UPLOADED',
    DELETED = 'DELETED',
    HIDDEN = 'HIDDEN',
    VIRUS_FOUND = 'VIRUS_FOUND'
}

export interface AppFile {
    uid: string;
    name: string;
    createdAt: string;
    createdBy: string;
    modifiedAt?: string;
    modifiedBy?: string;
    thumbnail: string;
    status: FileStatus;
    blob: Blob;
    metadata: FullMetadata;
}

import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Storage } from '@google-cloud/storage';
import { logger } from 'firebase-functions';
import { onDocumentDeleted, onDocumentCreated } from 'firebase-functions/v2/firestore';

if (!getApps().length) {
    initializeApp({
        credential: applicationDefault()
    });
}

const gcs = new Storage();
const firestore = getFirestore();

async function findFileAndDelete(filePath: string) {
    try {
        const [buckets] = await gcs.getBuckets();

        for (const bucketInfo of buckets) {
            const bucket = gcs.bucket(bucketInfo.name);
            const file = bucket.file(filePath);

            const [exists] = await file.exists();
            if (exists) {
                await file.delete();
                logger.info(`[findFileAndDelete] Deleted file: ${filePath} from bucket: ${bucketInfo.name}`);
                return;
            }
        }

        logger.warn(`[findFileAndDelete] File not found in any bucket: ${filePath}`);
    } catch (error) {
        logger.error(`[findFileAndDelete] Error scanning buckets for file: ${filePath}`, error);
    }
}

async function getActiveAppSettings(): Promise<{ ALLOWED_FILE_TYPES: string[] }> {
    const snapshot = await firestore.collection('appSettings').where('ACTIVE', '==', true).limit(1).get();

    if (snapshot.empty) {
        throw new Error(`[getActiveAppSettings] No active app settings found.`);
    }

    return snapshot.docs[0].data() as { ALLOWED_FILE_TYPES: string[] };
}

async function validateFileType(filePath: string): Promise<boolean> {
    try {
        const settings = await getActiveAppSettings();
        const [buckets] = await gcs.getBuckets();

        for (const bucketInfo of buckets) {
            const bucket = gcs.bucket(bucketInfo.name);
            const file = bucket.file(filePath);
            const [exists] = await file.exists();

            if (!exists) continue;

            const [metadata] = await file.getMetadata();
            const contentType = metadata.contentType;

            if (!contentType || !settings.ALLOWED_FILE_TYPES.includes(contentType)) {
                logger.warn(`[validateFileType] File type '${contentType}' not allowed.`);
                return false;
            }

            logger.info(`[validateFileType] File '${filePath}' is valid with type '${contentType}'`);
            return true;
        }

        logger.warn(`[validateFileType] File not found in any bucket: ${filePath}`);
        return false;
    } catch (error) {
        logger.error(`[validateFileType] Error validating file type: ${filePath}`, error);
        return false;
    }
}

async function updateFileStatus(filePath: string, status: 'VALIDATION_FAILED' | 'UPLOADED') {
    const filesCollection = firestore.collection('files');
    const fileRef = await filesCollection.where('metadata.fullPath', '==', filePath).limit(1).get();

    if (fileRef.empty) {
        logger.warn(`[updateFileStatus] No file reference found for: ${filePath}`);
        return;
    }

    const docId = fileRef.docs[0].id;
    await filesCollection.doc(docId).update({ status });
    logger.info(`[updateFileStatus] File ref.id: ${docId} status updated to: ${status} for file: ${filePath}`);

    if (status === 'VALIDATION_FAILED') {
        setTimeout(async () => {
            logger.warn(`[updateFileStatus] Deleting file reference: ${filePath}`);
            await filesCollection.doc(docId).delete();
        }, 5000); // Delete ref after 5 seconds, which will trigger file deletion
    }
}

export const validateFileOnRefCreated = onDocumentCreated('files/{fileId}', async (event) => {
    const fileData = event.data?.data();
    if (!fileData) {
        logger.warn(`[validateFileOnRefCreated] Created document does not contain any data.`);
        return;
    }

    const filePath = fileData.metadata?.fullPath;
    if (!filePath) {
        logger.warn(`[validateFileOnRefCreated] No file path found for file ID: ${event.params.fileId}`);
        return;
    }

    const isValid = await validateFileType(filePath);
    if (isValid) {
        await updateFileStatus(filePath, 'UPLOADED');
    } else {
        await updateFileStatus(filePath, 'VALIDATION_FAILED');
    }
});

export const deleteFileOnReferenceDeletion = onDocumentDeleted('files/{fileId}', async (event) => {
    const deletedData = event.data?.data();
    if (!deletedData) {
        logger.warn(`[deleteFileOnReferenceDeletion] Deleted document does not contain any data.`);
        return;
    }

    const filePath = deletedData.metadata?.fullPath;
    if (!filePath) {
        logger.warn(`[deleteFileOnReferenceDeletion] No file path found for deleted file ID: ${event.params.fileId}`);
        return;
    }
    await findFileAndDelete(filePath);
});

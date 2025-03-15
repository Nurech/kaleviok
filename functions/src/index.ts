import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { Storage } from '@google-cloud/storage';
import { logger } from 'firebase-functions';
import { onDocumentDeleted } from 'firebase-functions/v2/firestore';
import { onObjectFinalized } from 'firebase-functions/v2/storage';

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

/**
 * Deletes a file from storage when its Firestore reference is deleted.
 */
export const deleteFileOnReferenceDeletion = onDocumentDeleted('files/{fileId}', async (event) => {
    const deletedData = event.data?.data();
    if (!deletedData) {
        logger.warn(`[deleteFileOnReferenceDeletion] Deleted document does not contain any data.`);
        return;
    }

    const filePath = deletedData?.metadata?.fullPath;
    if (!filePath) {
        logger.warn(`[deleteFileOnReferenceDeletion] No file path found for deleted file ID: ${event.params.fileId}`);
        return;
    }
    await findFileAndDelete(filePath);
});

/**
 * Validates uploaded files and deletes them if they are not allowed.
 */
export const validateUploadedFile = onObjectFinalized({ bucket: process.env.FIREBASE_STORAGE_BUCKET }, async (event) => {
    const filePath = event.data.name;
    if (!filePath) {
        logger.warn(`[validateUploadedFile] No file path found in storage event.`);
        return;
    }
    async function validateFileType(filePath: string): Promise<boolean> {
        try {
            async function getActiveAppSettings(): Promise<{ ALLOWED_FILE_TYPES: string[] }> {
                const snapshot = await firestore.collection('appSettings')
                    .where('active', '==', true)
                    .limit(1)
                    .get();

                if (snapshot.empty) {
                    throw new Error(`[getActiveAppSettings] No active app settings found.`);
                }

                return snapshot.docs[0].data() as { ALLOWED_FILE_TYPES: string[] };
            }

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
    const isValid = await validateFileType(filePath);
    if (!isValid) {
        logger.warn(`[validateUploadedFile] Deleting invalid file: ${filePath}`);
        await findFileAndDelete(filePath);
    }
});

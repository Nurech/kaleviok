import { getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { Storage } from '@google-cloud/storage';
import { logger } from 'firebase-functions';
import { onDocumentDeleted } from 'firebase-functions/v2/firestore';

if (!getApps().length) {
    initializeApp({
        credential: applicationDefault()
    });
}

const gcs = new Storage();

async function findFileAndDelete(filePath: string) {
    try {
        const [buckets] = await gcs.getBuckets();

        for (const bucketInfo of buckets) {
            const bucket = gcs.bucket(bucketInfo.name);
            const file = bucket.file(filePath);

            const [exists] = await file.exists();
            if (exists) {
                await file.delete();
                logger.info(`Deleted file: ${filePath} from bucket: ${bucketInfo.name}`);
                return;
            }
        }

        logger.warn(`File not found in any bucket: ${filePath}`);
    } catch (error) {
        logger.error(`Error scanning buckets for file: ${filePath}`, error);
    }
}

export const deleteFileOnReferenceDeletion = onDocumentDeleted('files/{fileId}', async (event) => {
    const deletedData = event.data?.data();
    if (!deletedData) {
        logger.warn(`Deleted document does not contain any data.`);
        return;
    }

    const filePath = deletedData?.metadata?.fullPath;
    if (!filePath) {
        logger.warn(`No file path found for deleted file ID: ${event.params.fileId}`);
        return;
    }

    await findFileAndDelete(filePath);
});

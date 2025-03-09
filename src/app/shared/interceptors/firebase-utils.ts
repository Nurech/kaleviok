import { setDoc, DocumentReference, SetOptions } from 'firebase/firestore';

/**
 * Custom wrapper for Firebase `setDoc` to clean up undefined values before saving.
 */
export async function cleanSetDoc<T extends Record<string, any>>(
    docRef: DocumentReference<T>,
    data: T,
    options?: SetOptions
): Promise<void> {
    const cleanedData: Record<string, any> = Object.fromEntries(
        Object.entries(data).filter(([value]) => value !== undefined)
    );

    console.warn('Saving cleaned data:', cleanedData); // Debugging

    return setDoc(docRef, cleanedData as T, options ?? {});
}

import { setDoc, DocumentReference, SetOptions } from 'firebase/firestore';

/**
 * Recursively removes `undefined` values from an object using `reduce()`.
 */
function removeUndefinedRecursively<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj.map(removeUndefinedRecursively) as unknown as T;
    }

    if (typeof obj === 'object' && obj !== null) {
        return Object.entries(obj).reduce((acc, [key, value]) => {
            const cleanedValue = removeUndefinedRecursively(value);
            if (cleanedValue !== undefined) {
                acc[key as keyof T] = cleanedValue;
            }
            return acc;
        }, {} as T);
    }

    return obj;
}

/**
 * Custom wrapper for Firebase `setDoc` to clean up undefined values before saving.
 */
export async function setDocClean<T extends Record<string, any>>(docRef: DocumentReference<T>, data: T, options?: SetOptions): Promise<void> {
    const cleanedData = removeUndefinedRecursively(data);

    console.warn('Saving cleaned data:', cleanedData);

    return setDoc(docRef, cleanedData as T, options ?? {});
}

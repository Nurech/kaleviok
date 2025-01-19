import { User, UserCredential } from '@angular/fire/auth';

export interface Account {
    uid: string;
    firstName?: string;
    lastName?: string;
    email?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
    emailVerified?: boolean;
    providerId?: string | null;
    createdAt?: string;
    lastLoginAt?: string;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerData?: Record<string, any>[];
}

export const UserMapper = {
    mapUserCredentialToUser(response: UserCredential): Account {
        const providerData = response.user.providerData.map((provider) => provider) || []; // Include all provider data

        return {
            uid: response.user.uid,
            firstName: response.user.displayName ? response.user.displayName.split(' ')[0] : '',
            lastName: response.user.displayName ? response.user.displayName.split(' ')[1] : '',
            email: response.user.email || null,
            phoneNumber: response.user.phoneNumber || null,
            photoURL: response.user.photoURL || null,
            emailVerified: response.user.emailVerified,
            providerId: response.providerId || null,
            createdAt: response.user.metadata?.creationTime || undefined,
            lastLoginAt: response.user.metadata?.lastSignInTime || undefined,
            isAnonymous: response.user.isAnonymous,
            tenantId: response.user.tenantId || null,
            providerData
        };
    },

    mapFirebaseUserToUser(firebaseUser: User): Account {
        const providerData = firebaseUser.providerData.map((provider) => provider) || []; // Include all provider data

        return {
            uid: firebaseUser.uid,
            firstName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : '',
            lastName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[1] : '',
            email: firebaseUser.email || null,
            phoneNumber: firebaseUser.phoneNumber || null,
            photoURL: firebaseUser.photoURL || null,
            emailVerified: firebaseUser.emailVerified,
            providerId: providerData[0]?.providerId || null,
            createdAt: firebaseUser.metadata?.creationTime || undefined,
            lastLoginAt: firebaseUser.metadata?.lastSignInTime || undefined,
            isAnonymous: firebaseUser.isAnonymous,
            tenantId: firebaseUser.tenantId || null,
            providerData
        };
    }
};

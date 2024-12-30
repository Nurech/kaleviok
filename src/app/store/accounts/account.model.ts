import { User, UserCredential } from '@angular/fire/auth';

export interface Account {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export const UserMapper = {
  mapUserCredentialToUser(response: UserCredential): Account {
    return {
      uid: response.user.uid,
      firstName: response.user.displayName ? response.user.displayName.split(' ')[0] : '',
      lastName: response.user.displayName ? response.user.displayName.split(' ')[1] : '',
      email: response.user.email || null,
      phoneNumber: response.user.phoneNumber || null,
      photoURL: response.user.photoURL || null,
      emailVerified: response.user.emailVerified,
    } as Account;
  },

  mapFirebaseUserToUser(firebaseUser: User): Account {
    return {
      uid: firebaseUser.uid,
      firstName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[0] : '',
      lastName: firebaseUser.displayName ? firebaseUser.displayName.split(' ')[1] : '',
      email: firebaseUser.email || null,
      phoneNumber: firebaseUser.phoneNumber || null,
      photoURL: firebaseUser.photoURL || null,
      emailVerified: firebaseUser.emailVerified,
    } as Account;
  },
};

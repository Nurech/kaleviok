import { UserCredential } from '@angular/fire/auth';

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export const UserMapper = {
  mapResponseToUser(response: UserCredential) {
    return {
      uid: response.user.uid,
      firstName: response.user.displayName ? response.user.displayName.split(' ')[0] : '',
      lastName: response.user.displayName ? response.user.displayName.split(' ')[1] : '',
      email: response.user.email || null,
      phoneNumber: response.user.phoneNumber || null,
      photoURL: response.user.photoURL || null,
      emailVerified: response.user.emailVerified,
    } as User;
  },
};

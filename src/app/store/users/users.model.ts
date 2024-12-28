import { UserInfo } from '@firebase/auth';
import { UserCredential } from '@angular/fire/auth';

export interface User {
  uid: string;
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: UserInfo[];
}

export const UserMapper = {
  mapResponseToUser(response: UserCredential) {
    return {
      uid: response.user.uid,
      displayName: response.user.displayName || null,
      email: response.user.email || null,
      phoneNumber: response.user.phoneNumber || null,
      photoURL: response.user.photoURL || null,
      emailVerified: response.user.emailVerified,
      isAnonymous: response.user.isAnonymous,
      providerData: response.user.providerData,
    } as User;
  },
};

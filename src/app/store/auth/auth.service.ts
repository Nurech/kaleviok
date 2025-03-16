import { inject, Injectable, signal } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    linkWithCredential,
    EmailAuthProvider,
    updatePassword,
    User,
    UserCredential
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { authChanged } from './auth.actions';
import { UserMapper } from '../accounts/account.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private store$ = inject(Store);
    private authState = signal<User | null | undefined>(undefined);

    constructor() {
        onAuthStateChanged(this.auth, (user) => this.setAuthState(user || null));
    }

    registerWithEmail(email: string, password: string) {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }

    loginWithGoogle() {
        return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    loginWithEmail(email: string, password: string): Observable<UserCredential> {
        return from(
            new Promise<UserCredential>((resolve, reject) => {
                signInWithEmailAndPassword(this.auth, email, password)
                    .then(resolve)
                    .catch(async (error) => {
                        console.error('Email login failed:', error.code);
                        if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(error.code)) {
                            try {
                                const googleUserCredential = await signInWithPopup(this.auth, new GoogleAuthProvider());
                                await linkWithCredential(googleUserCredential.user, EmailAuthProvider.credential(email, password));
                                await this.promptSetPassword(googleUserCredential.user);
                                resolve(googleUserCredential);
                            } catch (googleError) {
                                console.error('Google sign-in failed:', googleError);
                                reject(googleError);
                            }
                            return;
                        }
                        reject(error);
                    });
            })
        );
    }

    private async promptSetPassword(user: UserCredential['user']) {
        const newPassword = prompt('Set a password for your email login:');
        if (newPassword) {
            try {
                await updatePassword(user, newPassword);
            } catch (error) {
                console.error('Error updating password:', error);
            }
        }
    }

    logout() {
        return from(signOut(this.auth));
    }

    getAuthState() {
        return this.authState();
    }

    private setAuthState(user: User | null) {
        this.authState.set(user);
        if (user) this.store$.dispatch(authChanged({ payload: UserMapper.mapFirebaseUserToUser(user) }));
    }
}

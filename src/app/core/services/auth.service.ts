import { Injectable } from '@angular/core';
import { AuthUser, AuthProvider, AuthOptions } from './auth.types';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Database } from '../classes/database.class';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

import { IUser, UserService } from 'src/app/account/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Database {
  authState$: Observable<firebase.User>;

  constructor(
    public db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    super();
    this.authState$ = this.afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  authenticate({ isSignin, provider, user }: AuthOptions): Promise<auth.UserCredential> {
    let operation: Promise<auth.UserCredential>;
    if (provider !== AuthProvider.Email) {
      operation = this.siginWithPopup(provider);
    } else {
      operation = isSignin ? this.signInWithEmail(user) : this.signUpWithEmail(user);
    }
    return operation;
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  private signInWithEmail({ email, password }: AuthUser): Promise<auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  private signUpWithEmail({ email, password }: AuthUser): Promise<auth.UserCredential> {
    const emailTransform = email.toLowerCase().trim();
    return this.afAuth
      .createUserWithEmailAndPassword(emailTransform, password)
      .then(credentials => {
        // Registra nova conta
        this.userService.addNewModel({ email, password }, credentials.user.uid);
        return credentials;
      });
  }

  siginWithPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let signInProvider = null;
    switch (provider) {
      case AuthProvider.Facebook:
        signInProvider = new auth.FacebookAuthProvider();
        break;
      case AuthProvider.Google:
        signInProvider = new auth.GoogleAuthProvider();
        break;
      case AuthProvider.Github:
        signInProvider = new auth.GithubAuthProvider();
        break;
    }
    return this.afAuth.signInWithPopup(signInProvider);
  }

  getUserByEmail(value) {
    return this.db
      .collection<IUser>(this.USERS, ref => ref.where('email', '==', value).limit(1))
      .valueChanges();
  }
}

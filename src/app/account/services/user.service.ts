import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthUser } from 'src/app/core/services/auth.types';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take, switchMap } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';

import * as moment from 'moment';

export interface IUser {
  id?: string;
  email: string;
  displayName?: string;
  firstname?: string;
  lastname?: string;
  gender?: boolean;
  birthday?: string;
  status: boolean;
  createdVip: string;
  isVip?: boolean;
  photoURL?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Mêses de Vip
  SETTING_MONTH = 6;

  private todosCollection: AngularFirestoreCollection<IUser>;

  constructor(protected db: AngularFirestore, protected afAuth: AngularFireAuth) {
    this.todosCollection = db.collection<IUser>('users');
  }

  getUser(): Observable<User> {
    return this.afAuth.authState.pipe(take(1));
  }

  saveToken(token: string, userId: string) {
    const devicesRef = this.db.collection('devices');
    const docData = { token, userId };
    return devicesRef.doc(token).set(docData);
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState)
    );
  }

  logUser() {
    this.getUser().subscribe(user => console.log(user));
  }

  getUserBySession(): Observable<IUser> {
    return this.getUser().pipe(switchMap(user => (user ? this.getOne(user.uid) : null)));
  }

  getOne(id: string) {
    return this.todosCollection.doc<IUser>(id).valueChanges();
  }

  getUserByEmail(value) {
    return this.db
      .collection<IUser>('users', ref => ref.where('email', '==', value).limit(1))
      .valueChanges();
  }

  update(todo: any, id: string) {
    // EDITAR GOLEIRO OU TREINADOR
    return this.todosCollection.doc(id).update(todo);
  }

  set(user: IUser, uid: string) {
    return this.todosCollection.doc(uid).set(user);
  }

  add(todo: IUser) {
    return this.todosCollection.add(todo);
  }

  remove(id: string) {
    return this.todosCollection.doc(id).delete();
  }

  /**
   * Utilizado em:
   * core/services/auth.service
   */
  addNewModel(user: AuthUser, uid: string) {
    const emailTransform = user.email.toLowerCase().trim();
    this.set({
      email: emailTransform,
      createdVip: moment().add(this.SETTING_MONTH, 'month').format(),
      status: true,
      id: uid
    }, uid);
  }
}

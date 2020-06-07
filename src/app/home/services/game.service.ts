import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export class UserModel {
  displayName: string;
  createdVip: string;
  isVip?: boolean;
  level: number;
  id: string;
}
export class GameService {
  db: firebase.firestore.Firestore;
  auth: firebase.auth.Auth;
  user: firebase.User;

  constructor() {
    this.db = firebase.firestore();
    this.auth = firebase.auth();
    this.user = this.auth.currentUser;
  }

  getBySession() {
    const model = {} as UserModel;
    this.db.doc(`/users/${this.user.uid}`).onSnapshot(snap => {
      model[snap.id] = snap.data() as UserModel;
    });
    return model;
  }

  update(item: any) {
    return this.db.doc(`/users/${item.id}`).update(item);
  }
}

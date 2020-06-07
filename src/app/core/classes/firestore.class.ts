import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Database } from './database.class';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
import 'firebase/firestore';

export abstract class Firestore<T extends { id: string }> extends Database {
  private isNow: string;

  constructor(protected db: AngularFirestore) {
    super();
    this.isNow = moment()
      .utc()
      .format();
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  private setItem(path: string, item, operation: string): Promise<T> {
    return this.db
      .collection(path)
      .doc<T>(item.id)
    [operation](item)
      .then(() => item);
  }

  addNewId(): string {
    return this.db.createId();
  }

  getAll(path: string, queryFn?: QueryFn): Observable<T[]> {
    return (queryFn
      ? this.db.collection<T>(path)
      : this.db.collection<T>(path, queryFn)
    ).valueChanges();
  }

  get(path: string, id: string): Observable<T> {
    return this.db
      .collection(path)
      .doc<T>(id)
      .valueChanges();
  }

  set(path: string, item: T): Promise<T> {
    const todo = Object.assign({ ...(item as object), createdAt: this.isNow });
    return this.setItem(path, todo, 'set');
  }

  add(path: string, item: T): Promise<T> {
    item.id = this.db.createId();
    const todo = Object.assign({ ...(item as object), createdAt: this.isNow });
    return this.setItem(path, todo, 'set');
  }

  update(path: string, item: any): Promise<any> {
    const todo = Object.assign({ ...(item as object), updatedAt: this.isNow });
    return this.setItem(path, todo, 'update');
  }

  delete(path: string, item: T): Promise<void> {
    return this.db
      .collection(path)
      .doc<T>(item.id)
      .delete();
  }
}

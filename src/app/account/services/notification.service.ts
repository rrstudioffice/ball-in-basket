import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';

export interface INotification {
  id: string;
  userId: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends Firestore<INotification> {
  constructor(protected db: AngularFirestore, private authService: AuthService) {
    super(db);
  }

  getAllBySession() {
    return this.authService.authState$.pipe(
      switchMap(user => {
        return this.db
          .collection<INotification>(`/${this.USERS}/${user.uid}/${this.NOTIFICATIONS}`)
          .valueChanges();
      })
    );
  }

  setModel(item: INotification) {
    return this.set(this.getPath(item.userId), item);
  }

  getModel(itemId: INotification) {
  }

  deleteModel(item: INotification) {
    return this.delete(this.getPath(item.userId), item);
  }

  updateModel(item: any) {
    return this.update(this.getPath(item.userid), item);
  }

  private getPath(userId: string) {
    return `/${this.USERS}/${userId}/${this.NOTIFICATIONS}`;
  }
}

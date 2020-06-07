import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ISetting {
  id?: string;
  activityByXp: IActiviyXp;
  auth: ISettingAuth;
  base64: ISettingBase64;
  carrer: ISettingCarrer;
  system: ISettingSystem;
}

export interface IActiviyXp {
  id?: string;
  goalDone: number;
  goalTaken: number;
}

export interface ISettingAuth {
  facebook: string;
  google: string;
  linkedin: string;
}

export interface ISettingCarrer {
  isOnOff: string;
  label: string;
  legend: string;
}

export interface ISettingSystem {
  app: string;
  badgeMenuOnOff: boolean; // ON/OFF = QUANTIDADE DE ITEMS DO MENU
  battle: boolean; // ON/OFF = Batalha dos Goleiros
  checkout: boolean; // ON/OFF = Checkout dos goleiros, treinadores nos jogos e treinos
  game: boolean; // ON/OFF = Cartola do Sou Goleiro
  isVip?: boolean; // ON/OFF = VIP
  ranking: boolean; // ON/OFF = Liga e Desliga o Ranking
  sharedOnOff: boolean; // ON/OFF = Liga e Desliga o compartilhamento
  printOnOff: boolean; // ON/OFF = Liga e Desliga a impressão dos relatórios
}

export interface ISettingTrainingImage {
  title: number;
  url: number;
}

export interface ISettingBase64 {
  club: string;
  default: string;
  noavatar: string;
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private itemsCollection: AngularFirestoreCollection<ISetting>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<ISetting>('settings');
  }

  getAllTrainingImages() {
    return this.db.collection<ISettingTrainingImage>('setting_training_images').valueChanges();
  }

  getAuth(): Observable<ISettingAuth> {
    return this.itemsCollection.doc<ISettingAuth>('auth').valueChanges();
  }

  getBase64(): Observable<ISettingBase64> {
    return this.itemsCollection.doc<ISettingBase64>('base64').valueChanges();
  }

  getSystem(): Observable<ISettingSystem> {
    return this.itemsCollection.doc<ISettingSystem>('system').valueChanges();
  }

  getCarrer(): Observable<ISettingCarrer> {
    return this.itemsCollection.doc<ISettingCarrer>('carrer').valueChanges();
  }

  getValuesXp(): Observable<IActiviyXp> {
    return this.itemsCollection.doc<IActiviyXp>('activityByXp').valueChanges();
  }

  getGoalkeeper() {
    return this.itemsCollection.doc<ISetting>('goalkeeper').valueChanges();
  }

  update(todo: any, id: string) {
    const constTodo = Object.assign({ ...todo, updatedAt: new Date().toISOString() });
    return this.itemsCollection.add(constTodo);
  }

  set(todo: ISetting, id: string) {
    return this.itemsCollection.doc(id).set(todo);
  }

  remove(id: string) {
    return this.itemsCollection.doc(id).delete();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SettingService } from 'src/app/core/services/setting.service';
import { UserService, IUser } from '../../services/user.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  model$: Observable<IUser>;
  status: string;
  setting: any;

  constructor(
    private user: UserService,
    private settingService: SettingService,
    private modalCtrl: ModalController
  ) {
    this.status = 'loading';
  }

  ngOnInit() {
    /** SETTING */
    this.setting = this.settingService.getSystem();
    /** SESSAO DE ACORDO COM O TYPE DO BD */
    this.model$ = this.user.getUserBySession();
    // this.circleProg.imageSrc = 'assets/icons/fundamental.svg';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // async upload(model: IUser) {
  //   const modal = await this.modalCtrl.create({
  //     component: ImagePage,
  //     // Passar sempre IMAGEM e URL
  //     componentProps: { image: model.photoURL, url: '/users/' + model.id },
  //     cssClass: 'my-custom-modal-css'
  //   });
  //   modal.onDidDismiss().then((result: any) => {
  //     if (result.data) {
  //       // ATUALIZA A IMAGEM AUTH
  //       this.user
  //         .getUser()
  //         .pipe(takeUntil(this.ngUnsubscribe))
  //         .subscribe(user => {
  //           this.user.update({ photoURL: result.data.image }, user.uid);
  //           user.updateProfile({
  //             displayName: user.displayName,
  //             photoURL: result.data.image
  //           });
  //         });
  //     }
  //   });
  //   modal.present();
  // }
}

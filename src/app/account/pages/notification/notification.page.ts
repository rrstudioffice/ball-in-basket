import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { NotificationService, INotification } from '../../services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit {
  items$: Observable<INotification[]>;
  status: string;

  constructor(private service: NotificationService, private overlayService: OverlayService) { }

  ngOnInit() {
    this.items$ = this.service.getAllBySession();
    this.status = 'active';
  }

  async delete(item: INotification) {
    const alert = await this.overlayService.alert({
      header: 'Confirmar!',
      message: 'Tem certeza de que deseja excluir?',
      buttons: [
        'Cancelar',
        {
          text: 'Ok',
          handler: () => {
            this.service.deleteModel(item).then(() => {
              this.overlayService.toast({
                message: 'Notificação excluída...'
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }
}

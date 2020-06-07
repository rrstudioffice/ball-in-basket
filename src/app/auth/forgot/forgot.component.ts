import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private overlay: OverlayService,
    private navCtrl: NavController,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }

  recoverPassword() {
    this.auth
      .resetPassword(this.form.value.email)
      .then(() => {
        this.overlay.toast({
          message: 'Procedimento de recuperação de senha enviado para o seu E-mail'
        });
        this.navCtrl.navigateRoot(['/auth/login']);
      })
      .catch(e => {
        if (e.code === 'auth/user-not-found') {
          this.overlay.toast({
            message:
              'Não há registro de usuário correspondente a esse identificador. O usuário pode ter sido excluído.'
          });
        }
        console.log(e);
      });
  }

  back() {
    this.navCtrl.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {

  constructor(private modalCrtl: ModalController) { }

  ngOnInit(): void {
  }

  async goPage() {
    const modal = await this.modalCrtl.create({
      component: LoginComponent
    });
    modal.present();
  }
}

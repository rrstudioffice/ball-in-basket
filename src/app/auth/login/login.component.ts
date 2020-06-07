import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from 'src/app/core/services/auth.types';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  @Input() condition: string;
  configs = { isSignIn: true, action: 'Login', actionChange: 'Abrir uma conta' };
  authProviders = AuthProvider;
  showPasswordText: boolean;
  form: FormGroup;

  private repeatPasswordControl = new FormControl(null, Validators.required);
  private repeatEmailControl = new FormControl(null, Validators.required);
  debouncer: any;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private overlay: OverlayService,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // TIRAR ESPAÇOS E LETRAR MAIUSCULAS
  createForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get repeatEmail(): FormControl {
    return this.form.get('repeatEmail') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  get repeatPassword(): FormControl {
    return this.form.get('repeatPassword') as FormControl;
  }

  changeAuthAction(): void {
    this.configs.isSignIn = !this.configs.isSignIn;
    const { isSignIn } = this.configs;
    this.configs.action = isSignIn ? 'Efetuar login' : 'Registrar';
    this.configs.actionChange = isSignIn ? 'Abrir conta' : 'Já tenho uma conta';
    !isSignIn
      ? this.form.addControl('repeatEmail', this.repeatEmailControl)
      : this.form.removeControl('repeatEmail');
    !isSignIn
      ? this.form.addControl('repeatPassword', this.repeatPasswordControl)
      : this.form.removeControl('repeatPassword');
  }

  async save(provider: AuthProvider): Promise<void> {
    const loading = await this.overlay.loading();
    try {
      const authenticate = await this.authService.authenticate({
        isSignin: this.configs.isSignIn,
        user: this.form.value,
        provider
      });
      this.modalCtrl.dismiss().then(() => {
        this.navCtrl.navigateRoot(['/']).then(() => loading.dismiss());
      });
    } catch (e) {
      await this.overlay.toast({ message: e.message }).then(() => loading.dismiss());
    }
  }
}

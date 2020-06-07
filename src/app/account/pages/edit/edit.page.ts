import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { OverlayService } from 'src/app/core/services/overlay.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  public form: FormGroup;
  states: any;
  cities: any;
  user: any;

  constructor(
    public fb: FormBuilder,
    private overlayService: OverlayService,
    private navCtrl: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
    this.init();
  }

  private init() {
    this.userService
      .getUserBySession()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => {
        this.user = user;
        this.form.patchValue(user);
      });
  }

  private createForm() {
    this.form = this.fb.group({
      firstname: [null, [Validators.required, Validators.minLength(4)]],
      lastname: [null, [Validators.required, Validators.minLength(4)]],
      birthday: [null, Validators.required],
      gender: [true, Validators.required],
      displayName: [null]
    });
  }

  get firstname(): FormControl {
    return this.form.get('firstname') as FormControl;
  }
  get lastname(): FormControl {
    return this.form.get('lastname') as FormControl;
  }
  get birthday(): FormControl {
    return this.form.get('birthday') as FormControl;
  }
  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  renderCity(event) {
    this.cities = this.states.find(f => f.initial === event.detail.value).cities;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async save() {
    const loading = await this.overlayService.loading({ message: 'Editando ...' });
    try {
      if (this.form.valid) {
        const displayName = this.form.value.firstname + ' ' + this.form.value.lastname;
        this.form.get('displayName').setValue(displayName);
        this.userService.update(this.form.value, this.user.id);
        this.navCtrl.navigateRoot('/account');
        this.overlayService.toast({ message: 'Sua conta foi alterada com sucesso!' });
        loading.dismiss();
      } else {
        loading.dismiss();
      }
    } catch (e) {}
  }
}

import { NgModule } from '@angular/core';
import { CompareValidatorDirective } from './compare-validator.directive';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthPage } from './auth.page';

import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  entryComponents: [LoginComponent, ForgotComponent],
  declarations: [AuthPage, CompareValidatorDirective, LoginComponent, ForgotComponent]
})
export class AuthModule { }

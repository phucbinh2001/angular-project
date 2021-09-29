import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    RecaptchaV3Module,
    NzAlertModule
  ],
  providers: [
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.captchaSiteKey }
  ]
})
export class AuthModule {}

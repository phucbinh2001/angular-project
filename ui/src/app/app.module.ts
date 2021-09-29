import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ScoreComponent } from './pages/score/score.component';
import { ReceiptComponent } from './pages/receipt/receipt.component';
import { RedeemComponent } from './pages/redeem/redeem.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ChangeProfileComponent } from './pages/change-profile/change-profile.component';
import { ReceiptDetailComponent } from './pages/receipt-detail/receipt-detail.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppHeaderComponent,
    NotfoundComponent,
    ScoreComponent,
    ReceiptComponent,
    RedeemComponent,
    ChangePasswordComponent,
    ChangeProfileComponent,
    ReceiptDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: APP_BASE_HREF, useValue: '/user' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

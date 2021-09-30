import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeProfileComponent } from '../change-profile/change-profile.component';
import { PackageComponent } from '../dashboard/package/package.component';
import { ReceiptDetailComponent } from '../receipt-detail/receipt-detail.component';
import { ReceiptComponent } from '../receipt/receipt.component';
import { RedeemComponent } from '../redeem/redeem.component';
import { ScoreComponent } from '../score/score.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'package',
        // component: YourPackageComponent,
        pathMatch: 'full',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'score',
        component: ScoreComponent,
        pathMatch: 'full'
      },
      {
        path: 'receipt',
        component: ReceiptComponent,
        pathMatch: 'full'
      },
      {
        path: 'receipt-detail',
        component: ReceiptDetailComponent,
        pathMatch: 'full'
      },
      {
        path: 'redeem',
        component: RedeemComponent,
        pathMatch: 'full'
      },
      {
        path: 'score',
        component: ScoreComponent,
        pathMatch: 'full'
      },
      {
        path: 'change-profile',
        component: ChangeProfileComponent,
        pathMatch: 'full'
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

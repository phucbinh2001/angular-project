import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageComponent } from '../dashboard/package/package.component';
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
        component: PackageComponent,
        pathMatch: 'full'
      }
    ]
  }

  // {
  //   path: 'user-admin/:id',
  //   // component: HelloComponent, // No need to mention the same component, in parent
  //   children: [
  //     // Children routes are inside the parent route
  //     {
  //       path: '',
  //       component: HelloComponent,
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'final-exams',
  //       component: HolaComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

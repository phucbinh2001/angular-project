import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TokenGuard } from './guards/token.guard';
import { PackageComponent } from './pages/dashboard/package/package.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [TokenGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

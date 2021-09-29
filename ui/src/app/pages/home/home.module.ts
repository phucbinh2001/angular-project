import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [HomeComponent, SidebarComponent],
  imports: [CommonModule, HomeRoutingModule, DashboardModule]
})
export class HomeModule {}

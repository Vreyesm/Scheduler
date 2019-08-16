import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InterfaceModule } from '../modules/interface/interface.module';
import { ScheduleComponent } from './schedule/schedule.component'; 

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InterfaceModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ScheduleComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ScheduleComponent,
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InterfaceModule } from '../modules/interface/interface.module';
import { AssignationDialogComponent } from './assignation-dialog/assignation-dialog.component';

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
    AssignationDialogComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  entryComponents: [
    AssignationDialogComponent
  ]
})
export class ComponentsModule { }

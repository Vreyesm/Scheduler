import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceModule } from '../../interface/interface.module';
import { TeachersListComponent } from './teachers-list/teachers-list.component';


@NgModule({
  declarations: [TeachersListComponent],
  imports: [
    CommonModule,
    InterfaceModule,
  ]
})
export class TeachersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceModule } from '../../interface/interface.module';
import { TeachersListComponent } from './teachers-list/teachers-list.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [TeachersListComponent],
  imports: [
    CommonModule,
    InterfaceModule,
    RouterModule.forChild([
      {
        path: '',
        component: TeachersListComponent,
        data: {
          title: 'Profesores'
        }
      }
    ])
  ]
})
export class TeachersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsListComponent } from './classrooms-list/classrooms-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { ClassroomViewComponent } from './classroom-view/classroom-view.component';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [ClassroomsListComponent, ClassroomViewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassroomsListComponent,
        data: {
          title: 'Salas'
        }
      },
      {
        path: ':id',
        component: ClassroomViewComponent,
        data: {
          title: 'Sala'
        }
      }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule
  ],
  exports: []
})
export class ClassroomsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsListComponent } from './classrooms-list/classrooms-list.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ClassroomsListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClassroomsListComponent,
        data: {
          title: 'Salas'
        }
      }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: []
})
export class ClassroomsModule { }

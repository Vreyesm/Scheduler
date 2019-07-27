import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SectionScheduleComponent } from './section-schedule/section-schedule.component';
import { ScheduleComponent } from '../../../components/schedule/schedule.component';
import { InterfaceModule } from '../../interface/interface.module';
@NgModule({
  declarations: [SubjectsListComponent, SectionScheduleComponent, ScheduleComponent],
  imports: [
    CommonModule,
    FormsModule,
    InterfaceModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubjectsListComponent,
        data: {
          title: 'Modulos'
        }
      },
      {
        path: ':id/schedule',
        component: SectionScheduleComponent,
        data: {
          title: 'Sección'
        }
      }
    ])
  ]
})
export class SubjectsModule { }

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
import { ScheduleComponent } from './schedule/schedule.component';
import { ComponentsModule } from '../../../components/components.module';
import { InterfaceModule } from '../../interface/interface.module';
import { SectionsTableComponent } from './sections-table/sections-table.component';
import { UploadFileDialogComponent } from './upload-file-dialog/upload-file-dialog.component';
@NgModule({
  declarations: [
    SubjectsListComponent,
    SectionScheduleComponent,
    SectionsTableComponent,
    ScheduleComponent,
    UploadFileDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InterfaceModule,
    ComponentsModule,
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
  ],
  entryComponents: [UploadFileDialogComponent]
})
export class SubjectsModule { }

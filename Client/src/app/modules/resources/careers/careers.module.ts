import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersListComponent } from './careers-list/careers-list.component';
import {RouterModule} from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddCareerComponent } from './add-career/add-career.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CareersListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CareersListComponent,
        data: {
          title: 'Carreras'
        }
      }
    ]),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule
  ]
})
export class CareersModule { }

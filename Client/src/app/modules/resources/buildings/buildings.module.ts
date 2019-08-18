import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsListComponent } from './buildings-list/buildings-list.component';
import { RouterModule } from '@angular/router';




// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


import {ClassroomsModule} from './classrooms/classrooms.module';
import {ClassroomsListComponent} from './classrooms/classrooms-list/classrooms-list.component';
import { ComponentsModule } from '../../../components/components.module';


@NgModule({
  declarations: [BuildingsListComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuildingsListComponent,
        data: {
          title: 'Edificios',
        }
      },
      {
        path: ':id/classrooms',
        loadChildren: () => import('./classrooms/classrooms.module').then(m => m.ClassroomsModule)
      }
    ]),
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule
  ],
})
export class BuildingsModule { }

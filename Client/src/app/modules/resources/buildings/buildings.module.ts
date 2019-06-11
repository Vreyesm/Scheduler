import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingsListComponent } from './buildings-list/buildings-list.component';
import { RouterModule } from '@angular/router';

import { ClassroomViewComponent } from './classroom-view/classroom-view.component';


// Material
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [BuildingsListComponent, ClassroomViewComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuildingsListComponent,
        data: {
          title: 'Edificios',
        }
      },
      {
        path: 'classroom',
        component: ClassroomViewComponent,
        data: {
          title: 'Sala'
        }
      },
    ]),
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule
  ]
})
export class BuildingsModule { }

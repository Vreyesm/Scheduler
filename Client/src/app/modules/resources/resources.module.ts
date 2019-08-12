import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesLandingComponent } from './resources-landing/resources-landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ResourcesLandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ResourcesLandingComponent,
      },
      {
        path: 'buildings',
        loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule),
      },
      {
        path: 'careers',
        loadChildren: () => import('./careers/careers.module').then(m => m.CareersModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'sections',
        loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
      }
    ]),
  ]
})
export class ResourcesModule { }

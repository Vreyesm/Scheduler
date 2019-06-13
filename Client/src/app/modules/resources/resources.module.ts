import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesLandingComponent } from './resources-landing/resources-landing.component';
import { RouterModule } from '@angular/router';
import {BuildingsModule} from './buildings/buildings.module';

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
      }
    ]),
  ]
})
export class ResourcesModule { }

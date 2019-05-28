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
        loadChildren: './buildings/buildings.module#BuildingsModule',
      }
    ]),
  ]
})
export class ResourcesModule { }

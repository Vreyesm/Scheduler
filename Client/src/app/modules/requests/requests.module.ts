import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAssignationRequestComponent } from './create-assignation-request/create-assignation-request.component';
import { RouterModule } from '@angular/router';
import { InterfaceModule } from '../interface/interface.module';
import { RequestsLandingComponent } from './requests-landing/requests-landing.component';


@NgModule({
  declarations: [CreateAssignationRequestComponent, RequestsLandingComponent],
  imports: [
    CommonModule,
    InterfaceModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestsLandingComponent,
      }
    ])
  ]
})
export class RequestsModule { }

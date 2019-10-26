import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAssignationRequestComponent } from './create-assignation-request/create-assignation-request.component';
import { RouterModule } from '@angular/router';
import { InterfaceModule } from '../interface/interface.module';
import { RequestsLandingComponent } from './requests-landing/requests-landing.component';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';


@NgModule({
  declarations: [CreateAssignationRequestComponent, RequestsLandingComponent, RequestDialogComponent],
  imports: [
    CommonModule,
    InterfaceModule,
    RouterModule.forChild([
      {
        path: '',
        component: RequestsLandingComponent,
      }
    ])
  ],
  entryComponents: [RequestDialogComponent]
})
export class RequestsModule { }

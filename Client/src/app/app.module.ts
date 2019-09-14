import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddBuildingComponent } from './modules/resources/buildings/add-building/add-building.component';
import { AddClassroomComponent } from './modules/resources/buildings/add-classroom/add-classroom.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ApiInterceptor } from './interceptors/api.interceptor';


// Material
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatPaginatorModule
} from '@angular/material';
import {AddCareerComponent} from './modules/resources/careers/add-career/add-career.component';
import { AddSubjectComponent } from './modules/resources/subjects/add-subject/add-subject.component';
import { InterfaceModule } from './modules/interface/interface.module';
import { AddTeacherComponent } from './modules/resources/teachers/add-teacher/add-teacher.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CompletedCareerComponent } from './modules/resources/subjects/completed-career/completed-career.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AssignationSelectDialogComponent } from './components/assignation-select-dialog/assignation-select-dialog.component';
import { AssignationRequestComponent } from './components/assignation-request/assignation-request.component';
import { AssignationRequestTypeComponent } from './components/assignation-request-type/assignation-request-type.component';
import { AssignationSpecialRequestComponent } from './components/assignation-special-request/assignation-special-request.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    AppRoutingModule,
    MatPaginatorModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    InterfaceModule,
    ButtonsModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AddBuildingComponent,
    AddClassroomComponent,
    AddCareerComponent,
    DeleteDialogComponent,
    AddSubjectComponent,
    AddTeacherComponent,
    LoginComponent,
    CompletedCareerComponent,
    LoaderComponent,
    AssignationSelectDialogComponent,
    AssignationRequestComponent,
    AssignationRequestTypeComponent,
    AssignationSpecialRequestComponent,
    // AssignationDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    AuthGuard
  ],
  entryComponents: [
    AddBuildingComponent,
    AddClassroomComponent,
    AddCareerComponent,
    AddSubjectComponent,
    AddTeacherComponent,
    DeleteDialogComponent,
    CompletedCareerComponent,
    AssignationSelectDialogComponent,
    AssignationRequestComponent,
    AssignationRequestTypeComponent,
    AssignationSpecialRequestComponent,
    // AssignationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

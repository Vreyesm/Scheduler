import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import localeEsCl from '@angular/common/locales/es-CL';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AddBuildingComponent } from './modules/resources/buildings/add-building/add-building.component';
import { AddClassroomComponent } from './modules/resources/buildings/add-classroom/add-classroom.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ApiInterceptor } from './interceptors/api.interceptor';

// tslint:disable-next-line: no-use-before-declare
registerLocaleData(localeEsCl, 'es-CL');


// Material
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { registerLocaleData } from '@angular/common';
import { MatPaginatorIntlEsp } from './PaginatorESP';
import { SearchComponent } from './components/search/search.component';

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
    SearchComponent,
    // AssignationDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CL' },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlEsp
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
    SearchComponent,
    // AssignationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

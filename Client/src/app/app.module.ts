import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddBuildingComponent } from './modules/resources/buildings/add-building/add-building.component';
import { AddClassroomComponent } from './modules/resources/buildings/add-classroom/add-classroom.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import {ClassroomsModule} from './modules/resources/buildings/classrooms/classrooms.module';

import { ApiInterceptor } from './interceptors/api.interceptor';


// Material
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatPaginatorModule
} from '@angular/material';
import {AddCareerComponent} from './modules/resources/careers/add-career/add-career.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    AppRoutingModule,
    MatPaginatorModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    AddBuildingComponent,
    AddClassroomComponent,
    AddCareerComponent,
    DeleteDialogComponent

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AddBuildingComponent,
    AddClassroomComponent,
    AddCareerComponent,
    DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

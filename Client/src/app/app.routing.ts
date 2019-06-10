import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './typography/typography.component';
import {IconsComponent} from './icons/icons.component';
import {NotificationsComponent} from './notifications/notifications.component';


export const ROUTES: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: {
      title: 'Perfil de usuario'
    }
  },
  {
    path: 'resources',
    loadChildren: () => import('./modules/resources/resources.module').then(m => m.ResourcesModule),
    data: {
      title: 'Recursos'
    }
  },
  {path: 'table-list', component: TableListComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'notifications', component: NotificationsComponent},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

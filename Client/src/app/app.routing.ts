import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';


export const ROUTES: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/resources/resources.module').then(m => m.ResourcesModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resources',
    loadChildren: () => import('./modules/resources/resources.module').then(m => m.ResourcesModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Recursos'
    }
  },
  {
    path: 'assignations',
    loadChildren: () => import('./modules/requests/requests.module').then(m => m.RequestsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Solicitudes de asignaciones'
    }
  }
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

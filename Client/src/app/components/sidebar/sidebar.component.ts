import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../models';
declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'dashboard', class: '' },
    { path: '/resources', title: 'Recursos', icon: 'content_paste', class: ''},
    //{ path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    //{ path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    //{ path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    //{ path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(route => route);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }

  logged(): boolean {
    return this.authService.isUserLogged() && !this.authService.isTokenExpired();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }
}

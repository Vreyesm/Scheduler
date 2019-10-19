import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import { AuthService, TeacherService, CareerService, AssignationService } from '../../services';
import { UserType, Career } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { AssignationDialogComponent } from '../assignation-dialog/assignation-dialog.component';
import { Observable } from 'rxjs';
import { AssignationRequestComponent } from '../assignation-request/assignation-request.component';
import { AssignationRequestTypeComponent } from '../assignation-request-type/assignation-request-type.component';
import { AssignationSpecialRequestComponent } from '../assignation-special-request/assignation-special-request.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobileMenuVisible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public breadcrumbs: IBreadCrumb[];
  public userName: string;

  completedCareers: Career[];

  constructor(location: Location,
              private element: ElementRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private teacherService: TeacherService,
              private careerService: CareerService,
              private dialog: MatDialog,
              private assignationService: AssignationService) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    // this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      const $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobileMenuVisible = 0;
      }
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });

    this.teacherService.get(this.authService.getId()).subscribe(data => {
      this.userName = data.name;
    });

    if (this.isAdmin()) {
      this.loadCompletedCareers();
    }

  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobileMenuVisible == 1) {
      // $('html').removeClass('nav-open');
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobileMenuVisible = 0;
    } else {
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function() { // asign a function
        body.classList.remove('nav-open');
        this.mobileMenuVisible = 0;
        $layer.classList.remove('visible');
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function() {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobileMenuVisible = 1;

    }
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(2);
    }
    titlee = titlee.split('/').pop();

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return titlee;
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {

    // If no routeConfig is available we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.title : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label,
      url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }

  isProfessor(): boolean {
    return this.authService.getRole() === UserType.Professor;
  }

  isStudent(): boolean {
    return this.authService.getRole() === UserType.Student;
  }

  loadCompletedCareers() {
    this.careerService.getCompletedCareers().subscribe(data => {
      this.completedCareers = data;
    });
  }

  selectAssignation() {
    let type: number;
    const dialogRef = this.dialog.open(AssignationDialogComponent, { 
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe(result => {
      type = result;
      if (type === 1) {
        this.assignationService.deleteAllAsignations().subscribe(
          () => {},
          () => {},
          () => {
            this.assignationService.autoAssignations().subscribe(
              () => {},
              () => {},
              () => { this.router.navigateByUrl('resources'); }
            );
          }
        );
      } else if (type === 2) {
        this.assignationService.autoAssignations().subscribe(
          () => {},
          () => {},
          () => { this.router.navigateByUrl('resources'); }
        );
      } else if (type === 3) {
        this.assignationService.deleteAllAsignations().subscribe(
          () => {},
          () => {},
          () => { this.router.navigateByUrl('resources'); }
        );
      }
    });
  }

  sendAssignationRequest() {
    const dialogRef = this.dialog.open(AssignationRequestTypeComponent, {
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const extraordinaryRef = this.dialog.open(AssignationRequestComponent, {
          autoFocus: false
        });
      } else if (result === 2) {
        const specialRef = this.dialog.open(AssignationSpecialRequestComponent, {
          autoFocus: false
        });
      }
    });
  }
}

export interface IBreadCrumb {
  label: string;
  url: string;
}

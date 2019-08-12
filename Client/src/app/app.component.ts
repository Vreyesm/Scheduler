import { Component} from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserType } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  logged(): boolean {
    return this.authService.isUserLogged() && !this.authService.isTokenExpired();
  }
  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }
}

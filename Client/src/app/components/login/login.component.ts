import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserData } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group ({
  email: ['', [Validators.required, Validators.email]],
  password:  ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.isUserLogged() && !this.authService.isTokenExpired()) {
      this.router.navigateByUrl('dashboard');
    }
  }
  submit() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('id_user', data.id);
      localStorage.setItem('role', data.role);
    },
    () => {},
    () => {
      this.router.navigateByUrl('dashboard');
    });
  }
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }


}

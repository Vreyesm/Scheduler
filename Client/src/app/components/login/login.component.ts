import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserData, UserType } from '../../models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.isUserLogged() && !this.authService.isTokenExpired()) {
      const role = this.authService.getRole();
      if (role === UserType.Director || role === UserType.Professor) {
        this.router.navigateByUrl('resources/subjects');
      } else {
        this.router.navigateByUrl('dashboard');
      }
    }
  }
  submit() {
    this.authService.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('id_user', data.id);
      localStorage.setItem('role', data.role);
    },
      () => {
        Swal.fire({
          position: 'top-end',
          type: 'error',
          title: 'Error al iniciar sesión',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
      },
      () => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Sesión iniciada',
          showConfirmButton: false,
          timer: 1500,
          toast: true
        });
        const role = +this.authService.getRole();
        if (role === UserType.Director || role === UserType.Professor) {
          // console.log('it\'s a director or a teacher');
          this.router.navigateByUrl('resources/subjects');
        } else {
          this.router.navigateByUrl('dashboard');
        }
      });
  }
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  noCredentials() {
    this.loginForm.get('email').setValue('student@scheduler.cl');
    this.loginForm.get('password').setValue('123456');
    this.submit();
  }

}

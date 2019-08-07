import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }
  submit() {
    alert(this.loginForm.value);
  }
  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }


}

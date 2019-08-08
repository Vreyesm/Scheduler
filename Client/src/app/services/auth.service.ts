import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { ok } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static API_ROOT = 'api/Auth/';

  constructor(private http: HttpClient) { }

  login(credentials: UserData) {
    return this.http.post<Response>(AuthService.API_ROOT + 'Login', credentials);
  }

  register(user: UserData): Observable<UserData> {
    return this.http.post<UserData>(AuthService.API_ROOT + 'Register', user);
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  getId(): string {
    return localStorage.getItem('id_user').replace('"', '').replace('"', '');
  }

  isUserLogged(): boolean {
    const token = this.getToken();

    if (token !== null && typeof token === 'string') {
      return true;
    } else {
      return false;
    }
  }

  getRole(): number {
    /*let token = this.getToken();
    if (!token) { token = this.getToken(); }
    if (!token) { return ''; }

    const decoded = jwt_decode<Decoded>(this.getToken());
    // return "Admin";
    return decoded.role;*/
    return +localStorage.getItem('role');
  }

  getUserData(): Observable<UserData> {
    return this.http.get<Userdata>();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_user');
    localStorage.removeItem('role');
    localStorage.clear();
  }

  // https://medium.com/@amcdnl/authentication-in-angular-jwt-c1067495c5e0
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<Decoded>(token);
    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);

    if (date === undefined) { return false; }

    return (date < new Date());
  }


}

export interface Response {
  id: string;
  token: string;
  role: string;
}

export interface Decoded {
    sub: string;
    role: string;
    jti: string;
    exp: number;
    iss: string;
    aud: string;
}

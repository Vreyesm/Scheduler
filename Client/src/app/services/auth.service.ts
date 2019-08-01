import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static API_ROOT = 'api/Auth/Register';

  constructor(private http: HttpClient) { }

  register(user: UserData):Observable<UserData> {
    return this.http.post<UserData>(AuthService.API_ROOT, user);
  }
}

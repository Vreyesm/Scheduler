import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private readonly http: HttpClient) { }

  pingTest(): Observable<any> {
    console.log(environment.apiEndpoint);
    return this.http.get( environment.apiEndpoint +  '/api/ping');
  }
}

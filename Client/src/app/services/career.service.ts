import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Career, Subject} from '../models';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
  private static  API_ROOT = 'api/careers';

  constructor(private http: HttpClient) { }
  getCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(CareerService.API_ROOT);
  }
  add(career: Career): Observable<Career> {
    return this.http.post<Career>(CareerService.API_ROOT, career);
  }
  count(): Observable<number> {
    return this.http.get<number>(CareerService.API_ROOT + '/count');
  }
  edit(career: Career): Observable<Career> {
    return this.http.put<Career>(CareerService.API_ROOT + '/' + career.id, career);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(CareerService.API_ROOT + '/' + id);
  }
}

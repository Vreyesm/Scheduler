import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private static API_ROOT = 'api/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(SubjectsService.API_ROOT);
  }

  add(subject: Subject, careerId: number): Observable<Subject> {
    return this.http.post<Subject>(SubjectsService.API_ROOT + '/career/' + careerId, subject);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(SubjectsService.API_ROOT + '/' + id);
  }

  count(): Observable<number> {
    return this.http.get<number>(SubjectsService.API_ROOT + '/count');
  }
}

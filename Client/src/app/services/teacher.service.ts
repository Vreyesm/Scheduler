import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private static API_TEACHERS = 'api/Users/Teachers';
  private static API_ROOT = 'api/Users';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(TeacherService.API_TEACHERS);
  }
  add(teacher: UserData): Observable<UserData> {
    return this.http.post<UserData>(TeacherService.API_ROOT, teacher);
  }
  count(): Observable<number> {
    return this.http.get<number>(TeacherService.API_TEACHERS + '/Count');
  }
  get(id: string): Observable<UserData> {
    return this.http.get<UserData>(TeacherService.API_ROOT + '/' + id);
  }
  update(teacher: UserData): Observable<any> {
    return this.http.put<any>(TeacherService.API_ROOT + '/' + teacher.id, teacher);
  }
  delete(id: string) {
    return this.http.delete<any>(TeacherService.API_ROOT + '/' + id);
  }

}

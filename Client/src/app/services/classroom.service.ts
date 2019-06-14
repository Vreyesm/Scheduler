import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom} from '../models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private static API_ROOT = 'api/classrooms';
  private static API_BUILDINGS = 'api/buildings';
  constructor(private http: HttpClient) { }

  add(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(ClassroomService.API_BUILDINGS + '/' + classroom.buildingId + '/classroom' , classroom);
  }

  edit(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(ClassroomService.API_ROOT + '/' + classroom.id, classroom);
  }

  delete(classroom: Classroom): Observable<Classroom> {
    return this.http.delete<any>(ClassroomService.API_ROOT + '/' + classroom.id);
  }

  count(): Observable<number> {
    return this.http.get<number>(ClassroomService.API_ROOT + '/count');
  }
}

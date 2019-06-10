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

  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(ClassroomService.API_BUILDINGS + '/' + classroom.buildingId + '/classroom' , classroom);
  }
}

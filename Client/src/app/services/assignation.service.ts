import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AssignationService {
  private static API_ROOT = 'api/Assignations';

  constructor(private http: HttpClient) { }

  getAssignationsByClassroom(idClassroom: number): Observable<Assignation[]> {
    return this.http.get<Assignation[]>(AssignationService.API_ROOT + '/Classroom/' + idClassroom);
  }
}

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
  getAssignationsBySection(idSection: number): Observable<Assignation[]> {
    return this.http.get<Assignation[]>(AssignationService.API_ROOT + '/Section/' + idSection);
  }

  deleteAllAsignations(): Observable<any> {
    return this.http.delete<any>(AssignationService.API_ROOT + '/All');
  }

  autoAssignations(): Observable<any> {
    return this.http.get<any>(AssignationService.API_ROOT + '/Auto');
  }

  sendAssignations(assignations: Assignation[]): Observable<any> {
    return this.http.post<any>(AssignationService.API_ROOT + '/All', assignations);
  }

  deleteAssignation(id: number): Observable<any> {
    return this.http.delete<any>(AssignationService.API_ROOT + '/' + id);
  }
}

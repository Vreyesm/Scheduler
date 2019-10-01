import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssignationRequest } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignationRequestService {
  private static API_ROOT = 'api/AssignationRequests';

  constructor(private http: HttpClient) { }

  sendAssignationRequest(request: AssignationRequest): Observable<any> {
    return this.http.post<any>(AssignationRequestService.API_ROOT, request);
  }
  getAll(): Observable<AssignationRequest[]> {
    return this.http.get<AssignationRequest[]>(AssignationRequestService.API_ROOT);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(AssignationRequestService.API_ROOT + '/' + id);
  }
  accept(id: number): Observable<any> {
    return this.http.get<any>(AssignationRequestService.API_ROOT + '/' + id + '/Accept');
  }
}

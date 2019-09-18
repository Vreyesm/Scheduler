import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom, Building} from '../models';
import {Observable} from 'rxjs';
import { WeekDay } from '@angular/common';

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

  getAll(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(ClassroomService.API_ROOT);
  }

  get(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(ClassroomService.API_ROOT + '/' + id);
  }

  getAllAvailable(day: WeekDay, block: number, span: number): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(ClassroomService.API_ROOT + `/Available/Day/${day}/Block/${block}/Span/${span}`);
  }

  getAllAvailableByBuilding(day: WeekDay, block: number, span: number): Observable<Building[]> {
    return this.http.get<Building[]>(ClassroomService.API_ROOT + `/Building/Available/Day/${day}/Block/${block}/Span/${span}`);
  }

  getAllAvailableByBuildingOnTime(day: WeekDay, block: number, date: Date): Observable<Building[]> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<Building[]>(ClassroomService.API_ROOT + `/Available/Time`, {Date: date, Day: day, Block: block});
  }
}

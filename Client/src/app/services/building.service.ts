import { Injectable } from '@angular/core';
import { Building } from '../models';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private static API_ROOT = 'api/buildings';

  constructor(private http: HttpClient) { }

  getBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(BuildingService.API_ROOT + '/' + id);
  }

  add(building: Building): Observable<Building> {
    return this.http.post<Building>(BuildingService.API_ROOT, building);
  }

  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(BuildingService.API_ROOT);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(BuildingService.API_ROOT + '/' + id);
  }

  edit(building: Building): Observable<Building> {
    return this.http.put<Building>(BuildingService.API_ROOT + '/' + building.id, building);
  }

  count(): Observable<number> {
    return this.http.get<number>(BuildingService.API_ROOT + '/count');
  }
}

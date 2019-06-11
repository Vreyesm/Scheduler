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

  addBuilding(building: Building): Observable<Building> {
    return this.http.post<Building>(BuildingService.API_ROOT, building);
  }

  getBuildings(): Observable<Building[]> {
    return this.http.get<Building[]>(BuildingService.API_ROOT);
  }
}

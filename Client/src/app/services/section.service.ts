import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private static API_ROOT = 'api/sections';

  constructor(private http: HttpClient) { }

  count(): Observable<number> {
    return this.http.get<number>(SectionService.API_ROOT + '/count');
  }
  get(id: number): Observable<Section> {
    return this.http.get<Section>(SectionService.API_ROOT + '/' + id);
  }
  delete(idSection: number): Observable<any> {
    return this.http.delete<any>(SectionService.API_ROOT + '/' + idSection);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private static API_ROOT = 'api/sections';

  constructor(private http: HttpClient) { }

  count(): Observable<number> {
    return this.http.get<number>(SectionService.API_ROOT + '/count');
  }
}

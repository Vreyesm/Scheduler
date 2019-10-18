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
  getAll(): Observable<Section[]> {
    return this.http.get<Section[]>(SectionService.API_ROOT);
  }
  get(id: number): Observable<Section> {
    return this.http.get<Section>(SectionService.API_ROOT + '/' + id);
  }
  getByTeacher(id: string): Observable<Section[]> {
    return this.http.get<Section[]>(SectionService.API_ROOT + '/Teacher/' + id);
  }
  update(section: Section): Observable<any> {
    return this.http.put<any>(SectionService.API_ROOT + '/' + section.id, section);
  }
  delete(idSection: number): Observable<any> {
    return this.http.delete<any>(SectionService.API_ROOT + '/' + idSection);
  }
  uploadFile(idCareer: number, form: FormData): Observable<any> {
    return this.http.post<any>(SectionService.API_ROOT + '/' + idCareer + '/Upload', form);
  }
  downloadExample(): Observable<any> {
    return this.http.get<any>(SectionService.API_ROOT + '/file-example');
  }
}

import { Component, OnInit } from '@angular/core';
import {  AuthService, BuildingService,
          ClassroomService, CareerService,
          SubjectsService, SectionService,
          TeacherService } from './../../../services';
import {Observable} from 'rxjs';
import { UserType } from './../../../models';

@Component({
  selector: 'app-resources-landing',
  templateUrl: './resources-landing.component.html',
  styleUrls: ['./resources-landing.component.scss']
})
export class ResourcesLandingComponent implements OnInit {
  buildingsCount: Observable<number>;
  classroomsCount: Observable<number>;
  careersCount: Observable<number>;
  subjectsCount: Observable<number>;
  sectionsCount: Observable<number>;
  teachersCount: Observable<number>;
  constructor(private buildingService: BuildingService,
              private classroomService: ClassroomService,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService,
              private teacherService: TeacherService,
              private authService: AuthService) { }

  ngOnInit() {
    this.buildingsCount = this.buildingService.count();
    this.classroomsCount = this.classroomService.count();
    this.careersCount = this.careerService.count();
    this.subjectsCount = this.subjectService.count();
    this.sectionsCount = this.sectionService.count();
    this.teachersCount = this.teacherService.count();
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }
}

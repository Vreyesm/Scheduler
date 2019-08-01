import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../../services/building.service';
import {ClassroomService} from '../../../services/classroom.service';
import {Observable} from 'rxjs';
import {CareerService} from '../../../services/career.service';
import { SubjectsService } from '../../../services/subjects.service';
import { SectionService } from '../../../services/section.service';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-resourceºs-landing',
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
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.buildingsCount = this.buildingService.count();
    this.classroomsCount = this.classroomService.count();
    this.careersCount = this.careerService.count();
    this.subjectsCount = this.subjectService.count();
    this.sectionsCount = this.sectionService.count();
    this.teachersCount = this.teacherService.count();
  }

}

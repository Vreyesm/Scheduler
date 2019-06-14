import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../../services/building.service';
import {ClassroomService} from '../../../services/classroom.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-resources-landing',
  templateUrl: './resources-landing.component.html',
  styleUrls: ['./resources-landing.component.scss']
})
export class ResourcesLandingComponent implements OnInit {
  buildingsCount: Observable<number>;
  classroomsCount: Observable<number>;

  constructor(private buildingService: BuildingService,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.buildingsCount = this.buildingService.count();
    this.classroomsCount = this.classroomService.count();
  }

}

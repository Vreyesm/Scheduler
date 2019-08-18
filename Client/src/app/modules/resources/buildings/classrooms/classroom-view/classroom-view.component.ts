import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../../../../services';
import { Classroom } from '../../../../../models';
import { ActivatedRoute } from '@angular/router';

export interface ScheduleBlock {
  block: string;
}

const DATA: ScheduleBlock[] = [
  { block: 'Bloque 1' },
  { block: 'Bloque 2' },
  { block: 'Bloque 3' },
  { block: 'Bloque 4' },
  { block: 'Bloque 5' },
  { block: 'Bloque 6' },
  { block: 'Bloque 7' },
  { block: 'Bloque 8' },
  { block: 'Bloque 9' },
  { block: 'Bloque 10' },
  { block: 'Bloque 11' },
];

@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.scss']
})
export class ClassroomViewComponent implements OnInit {

  checks = {
    monday: [false, false, false, false, false, false, false, false, false, false, false],
    tuesday: [false, false, false, false, false, false, false, false, false, false, false],
    wednesday: [false, false, false, false, false, false, false, false, false, false, false],
    thursday: [false, false, false, false, false, false, false, false, false, false, false],
    friday: [false, false, false, false, false, false, false, false, false, false, false],
    saturday: [false, false, false, false, false, false, false, false, false, false, false],
  };
  idClassroom: number;
  classroom: Classroom;

  displayedColumns: string[] = ['block', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource = DATA;
  class = 'Comunicación Oral y Escrita I';
  professor = 'Profesor con nombre muy largo';
  constructor(private classroomService: ClassroomService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      const idClassroom = +params['id'];
      this.classroomService.get(idClassroom).subscribe(data => {
        this.classroom = data;
        this.checks.monday = this.classroom.mondayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.tuesday = this.classroom.tuesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.wednesday = this.classroom.wednesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.thursday = this.classroom.thursdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.friday = this.classroom.fridayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.saturday = this.classroom.saturdayData.split(';').map((check) => check === 'true' ? true : false);
      });
    });
  }

  loadData() {
    /*this.classroomService.get().subscribe(data => {
      this.classroom = data;
      this.checks.monday = 
    });
    */
  }

}

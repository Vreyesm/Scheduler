import { Component, OnInit } from '@angular/core';
import { ClassroomService, AssignationService } from '../../../../../services';
import { Classroom, Assignation, SectionName } from '../../../../../models';
import { ActivatedRoute } from '@angular/router';
import { WeekDay } from '@angular/common';

export interface ScheduleBlock {
  id: number;
  block: string;
}

const DATA: ScheduleBlock[] = [
  { id: 1, block: 'Bloque 1' },
  { id: 2, block: 'Bloque 2' },
  { id: 3, block: 'Bloque 3' },
  { id: 4, block: 'Bloque 4' },
  { id: 5, block: 'Bloque 5' },
  { id: 6, block: 'Bloque 6' },
  { id: 7, block: 'Bloque 7' },
  { id: 8, block: 'Bloque 8' },
  { id: 9, block: 'Bloque 9' },
  { id: 10, block: 'Bloque 10' },
  { id: 11, block: 'Bloque 11' },
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
  sectionsNames = new SectionName();
  constructor(private classroomService: ClassroomService,
              private assignationService: AssignationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.idClassroom = +params['id'];
      this.classroomService.get(this.idClassroom).subscribe(data => {
        this.classroom = data;
        this.checks.monday = this.classroom.mondayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.tuesday = this.classroom.tuesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.wednesday = this.classroom.wednesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.thursday = this.classroom.thursdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.friday = this.classroom.fridayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.saturday = this.classroom.saturdayData.split(';').map((check) => check === 'true' ? true : false);
      },
        () => { },
        () => {
          let assignations: Assignation[];
          this.assignationService.getAssignationsByClassroom(this.idClassroom).subscribe(data => {
            assignations = data;
            const monday: Assignation[] = assignations.filter(a => a.day === WeekDay.Monday);
            monday.forEach(a => {
              this.sectionsNames.monday[a.block] = a.section.name;
            });
            const tuesday: Assignation[] = assignations.filter(a => a.day === WeekDay.Tuesday);
            tuesday.forEach(a => {
              this.sectionsNames.tuesday[a.block] = a.section.name;
            });
            const wednesday: Assignation[] = assignations.filter(a => a.day === WeekDay.Wednesday);
            wednesday.forEach(a => {
              this.sectionsNames.wednesday[a.block] = a.section.name;
            });
            const thursday: Assignation[] = assignations.filter(a => a.day === WeekDay.Thursday);
            thursday.forEach(a => {
              this.sectionsNames.thursday[a.block] = a.section.name;
            });
            const friday: Assignation[] = assignations.filter(a => a.day === WeekDay.Friday);
            friday.forEach(a => {
              this.sectionsNames.friday[a.block] = a.section.name;
            });
            const saturday: Assignation[] = assignations.filter(a => a.day === WeekDay.Saturday);
            saturday.forEach(a => {
              this.sectionsNames.saturday[a.block] = a.section.name;
            });
          });
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
  checkButton(list: boolean[], index: number) {
    list[index] = !list[index];
  }

  loadSections() {
    let assignations: Assignation[];
    this.assignationService.getAssignationsByClassroom(this.idClassroom).subscribe(data => {
      assignations = data;
      const monday: Assignation[] = assignations.filter(a => a.day === WeekDay.Monday);
      monday.forEach(a => {
        this.sectionsNames.monday[a.block] = a.section.name;
      });
      console.log(monday);
    });
  }

}

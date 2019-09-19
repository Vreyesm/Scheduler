import { Component, OnInit, Inject } from '@angular/core';
import { Section, UserData, Assignation, BlockName, UserType } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeacherService, SectionService, AssignationService, AuthService } from '../../../../services';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-section-schedule',
  templateUrl: './section-schedule.component.html',
  styleUrls: ['./section-schedule.component.scss']
})
export class SectionScheduleComponent implements OnInit {
  checks = {
    monday: [false, false, false, false, false, false, false, false, false, false, false],
    tuesday: [false, false, false, false, false, false, false, false, false, false, false],
    wednesday: [false, false, false, false, false, false, false, false, false, false, false],
    thursday: [false, false, false, false, false, false, false, false, false, false, false],
    friday: [false, false, false, false, false, false, false, false, false, false, false],
    saturday: [false, false, false, false, false, false, false, false, false, false, false],
  };

  idSection: number;
  students: number;
  section$: Observable<Section>;
  section: Section;
  teachers$: Observable<UserData[]>;
  teacherId: string;
  classroomNames = new BlockName();
  assignations: Assignation[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService,
              private teacherService: TeacherService,
              private assignationService: AssignationService,
              private auth: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.idSection = params['id'];
      this.sectionService.get(this.idSection).subscribe(data => {
        this.section = data;
        this.checks.monday = this.section.mondayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.tuesday = this.section.tuesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.wednesday = this.section.wednesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.thursday = this.section.thursdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.friday = this.section.fridayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.saturday = this.section.saturdayData.split(';').map((check) => check === 'true' ? true : false);
        this.teacherId = this.section.professorId;
      },
        () => { },
        () => {
          this.assignationService.getAssignationsBySection(this.idSection).subscribe(data => {
            this.assignations = data;
            const monday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Monday);
            monday.forEach(a => {
              this.classroomNames.monday[a.block] = a.classroom.name;
            });
            const tuesday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Tuesday);
            tuesday.forEach(a => {
              this.classroomNames.tuesday[a.block] = a.classroom.name;
            });
            const wednesday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Wednesday);
            wednesday.forEach(a => {
              this.classroomNames.wednesday[a.block] = a.classroom.name;
            });
            const thursday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Thursday);
            thursday.forEach(a => {
              this.classroomNames.thursday[a.block] = a.classroom.name;
            });
            const friday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Friday);
            friday.forEach(a => {
              this.classroomNames.friday[a.block] = a.classroom.name;
            });
            const saturday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Saturday);
            saturday.forEach(a => {
              this.classroomNames.saturday[a.block] = a.classroom.name;
            });
          });
        });
    });
    this.teachers$ = this.teacherService.getTeachers();
  }

  loadData() {
    this.classroomNames = new BlockName();
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.idSection = params['id'];
      this.sectionService.get(this.idSection).subscribe(data => {
        this.section = data;
        this.checks.monday = this.section.mondayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.tuesday = this.section.tuesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.wednesday = this.section.wednesdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.thursday = this.section.thursdayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.friday = this.section.fridayData.split(';').map((check) => check === 'true' ? true : false);
        this.checks.saturday = this.section.saturdayData.split(';').map((check) => check === 'true' ? true : false);
        this.teacherId = this.section.professorId;
      },
        () => { },
        () => {
          this.assignationService.getAssignationsBySection(this.idSection).subscribe(data => {
            this.assignations = data;
            const monday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Monday);
            monday.forEach(a => {
              this.classroomNames.monday[a.block] = a.classroom.name;
            });
            const tuesday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Tuesday);
            tuesday.forEach(a => {
              this.classroomNames.tuesday[a.block] = a.classroom.name;
            });
            const wednesday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Wednesday);
            wednesday.forEach(a => {
              this.classroomNames.wednesday[a.block] = a.classroom.name;
            });
            const thursday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Thursday);
            thursday.forEach(a => {
              this.classroomNames.thursday[a.block] = a.classroom.name;
            });
            const friday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Friday);
            friday.forEach(a => {
              this.classroomNames.friday[a.block] = a.classroom.name;
            });
            const saturday: Assignation[] = this.assignations.filter(a => a.day === WeekDay.Saturday);
            saturday.forEach(a => {
              this.classroomNames.saturday[a.block] = a.classroom.name;
            });
          });
        });
    });
    this.teachers$ = this.teacherService.getTeachers();
  }

  completed(values) {
    this.section.professorId = this.teacherId;
    this.section.mondayData = this.checks.monday.join(';');
    this.section.tuesdayData = this.checks.tuesday.join(';');
    this.section.wednesdayData = this.checks.wednesday.join(';');
    this.section.thursdayData = this.checks.thursday.join(';');
    this.section.fridayData = this.checks.friday.join(';');
    this.section.saturdayData = this.checks.saturday.join(';');

    this.sectionService.update(this.section).subscribe(
      () => { },
      () => { },
      () => {
        this.router.navigateByUrl('resources/subjects');
      }
    );
    // this.dialogRef.close();
  }

  sendAssignations(assignations: Assignation[]) {
    // const _assignations = assignations;
    // console.log(JSON.stringify(this.assignations));
    assignations.forEach(a => {
      a.section = this.section;
    });
    this.assignationService.sendAssignations(assignations).subscribe(
        () => { },
        () => { },
        () => { this.loadData(); }
      );
    }

  close(value) {
    this.router.navigateByUrl('resources/subjects');
  }

  reload(assignation: Assignation) {
    this.assignationService.deleteAssignation(assignation.id).subscribe(
      () => { },
      () => { },
      () => { this.loadData(); }
    );
  }

  canEdit(): boolean {
    const role = this.auth.getRole();
    return role === UserType.Admin || role === UserType.Director;
  }

}

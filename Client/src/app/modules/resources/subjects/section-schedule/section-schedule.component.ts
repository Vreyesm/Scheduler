import { Component, OnInit, Inject } from '@angular/core';
import { Section, UserData } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SectionService } from '../../../../services/section.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../../services/teacher.service';

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
  teacher: UserData = new UserData();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService,
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.idSection = params['id'];
      this.sectionService.get(this.idSection).subscribe(data => {
        this.section = data;
      });
    });
    this.teachers$ = this.teacherService.getTeachers();
  }

  completed(values) {
    console.log(this.teacher);
    this.section.professor = this.teacher;
    this.sectionService.update(this.section).subscribe(
      () => {},
      () => {},
      () => {
        this.router.navigateByUrl('resources/subjects');
      }
    );
    // this.dialogRef.close();
  }

  close(value) {
    // this.dialogRef.close();
  }
}

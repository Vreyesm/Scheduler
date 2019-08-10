import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Section, Career, UserData, UserType } from '../../../../models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CareerService } from '../../../../services/career.service';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectsService } from '../../../../services/subjects.service';
import { SectionScheduleComponent } from '../section-schedule/section-schedule.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';
import { SectionService } from '../../../../services/section.service';
import { TeacherService } from '../../../../services/teacher.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  sections: Section[] = [];
  teachers: UserData[];
  careers: Career[];
  subjects: Subject[];
  idCareer: number;

  data: Observable<Section[]>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService,
              private teacherService: TeacherService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadTeachers();
    this.loadRole();
  }
  loadRole() {
    const role = this.authService.getRole();
    const userId = this.authService.getId();

    // console.log('role: ' + role);

    if (role === UserType.Professor) {
      this.data = this.sectionService.getByTeacher(userId);
    } else if (role === UserType.Director) {
      let career: Career;
      this.careerService.getCareerByTeacher(userId).subscribe(data => {
        career = data;
      },
      () => {},
      () => {
        sessionStorage.setItem('career', '' + career.id);
        this.data = this.careerService.getSectionsByCareer(career.id);
      });
    } else if (role === UserType.Admin) {
      // this.data = this.sectionService.getAll();
      if (+sessionStorage.getItem('career') !== 0) {
        this.data = this.careerService.getSectionsByCareer(+sessionStorage.getItem('career'));
      }
    }
  }
  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    },
      () => { },
      () => {
        const previousCareer = +sessionStorage.getItem('career');
        if (previousCareer) {
          this.idCareer = previousCareer;
          this.loadCareers();
        } else {
          this.loadCareers();
        }
      });
  }

  loadCareers() {
    this.careerService.getCareers().subscribe(data => {
      this.careers = data;
      const sections = [];
      const career = this.careers.find(c => c.id === this.idCareer);
      if (career) {
        this.subjects = career.subjects;
        this.subjects.forEach(s => {
          if (s.sections) {
            s.sections.forEach(section => {
              const professor = this.teachers.find(t => t.id === section.professorId);
              section.professor = professor;
              sections.push(section);
              // console.log(section);
            });
          }
        });

      }
    });
  }

  careerChange() {
    sessionStorage.setItem('career', '' + this.idCareer);
    const career = this.careers.find(c => c.id === this.idCareer);
    if (career) {
      this.subjects = career.subjects;
      const sections = [];
      this.subjects.forEach(s => {
        if (s.sections) {
          s.sections.forEach(section => {
            const professor = this.teachers.find(t => t.id === section.professorId);
            section.professor = professor;
            sections.push(section);
            // console.log(section);
          });
        }
      });
      this.sections = sections;
      this.loadRole();
    }
  }

  addSubject() {
    let subject = new Subject();
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      // width: '500px',
      data: {
        element: subject,
        action: 'Crear'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      subject = result;
      if (subject) {
        subject.sections.forEach(section => {
          section.name = subject.name + ' - ' + section.name;
        });
        this.subjectService.add(subject, this.idCareer).subscribe(data => {
          this.loadCareers();
          this.loadRole();
        });
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }
}

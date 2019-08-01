import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Section, Career, UserData } from '../../../../models';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { CareerService } from '../../../../services/career.service';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectsService } from '../../../../services/subjects.service';
import { SectionScheduleComponent } from '../section-schedule/section-schedule.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';
import { SectionService } from '../../../../services/section.service';
import { TeacherService } from '../../../../services/teacher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  careers: Career[];
  idCareer: number;
  subjects: Subject[];
  teachers: UserData[];
  dataSource: MatTableDataSource<Section>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'teacher', 'students', 'options'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
              private router: Router,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService,
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.loadTeachers();
    // this.loadCareers();
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
        this.dataSource = new MatTableDataSource<Section>(sections);
        this.dataSource.sort = this.sort;
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
      this.dataSource = new MatTableDataSource<Section>(sections);
      this.dataSource.sort = this.sort;
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
        });
      }
    });
  }

  selectSchedule(section: Section) {
    const dialogRef = this.dialog.open(SectionScheduleComponent, {
      width: '900px',
      data: section
    });
  }

  deleteSection(section: Section) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: section.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.delete(section.id).subscribe(data => {
          this.loadCareers();
        });
      }
    });
  }

  goToSchedule(sectionId: number) {
    sessionStorage.setItem('career', '' + this.idCareer);
    this.router.navigateByUrl('resources/subjects/' + sectionId + '/schedule');
  }
}

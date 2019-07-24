import { Component, OnInit, ViewChild } from '@angular/core';
import {Career, Section} from '../../../../models';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import {SubjectsService} from '../../../../services/subjects.service';
import {AddSubjectComponent} from '../../subjects/add-subject/add-subject.component';
import {CareerService} from '../../../../services/career.service';
import {SectionScheduleComponent} from '../../subjects/section-schedule/section-schedule.component';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  careers: Career[];
  idCareer: number;
  // teachers: User[];
  // dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'students', 'options'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private careerService: CareerService,
              private subjectService: SubjectsService) { }

  ngOnInit() {
    // this.loadCareers();
  }

/*
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
              sections.push(section);
              // console.log(section);
            });
          }
        });
        this.dataSource = new MatTableDataSource<Subject>(sections);
        this.dataSource.sort = this.sort;
      }
    });
  }

  careerChange() {
    const career = this.careers.find(c => c.id === this.idCareer);
    if (career) {
      this.subjects = career.subjects;
      const sections = [];
      this.subjects.forEach(s => {
        if (s.sections) {
          s.sections.forEach(section => {
            sections.push(section);
            // console.log(section);
          });
        }
      });
      this.dataSource = new MatTableDataSource<Subject>(sections);
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

  selectSchedule(section: Section ) {
    const dialogRef = this.dialog.open(SectionScheduleComponent, {
      width: '900px',
      data: section
    });
  }
*/
}

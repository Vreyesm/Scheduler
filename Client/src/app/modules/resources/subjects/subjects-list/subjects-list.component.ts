import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Section, Career } from '../../../../models';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { CareerService } from '../../../../services/career.service';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { SubjectsService } from '../../../../services/subjects.service';
import { SectionScheduleComponent } from '../section-schedule/section-schedule.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';
import { SectionService } from '../../../../services/section.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  careers: Career[];
  idCareer: number;
  subjects: Subject[];
  dataSource: MatTableDataSource<Section>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'students', 'options'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService) { }

  ngOnInit() {
    this.loadCareers();
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
          //section.professorId = +section.teacher.id;
          console.log(section);
          console.log(section.professor);
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

  deleteSection(section: Section) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: section.name
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectionService.delete(section.id).subscribe( data => {
          this.loadCareers();
        });
      }
    });
  }

}

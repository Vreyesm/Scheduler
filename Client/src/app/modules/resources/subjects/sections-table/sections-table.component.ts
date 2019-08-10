import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
  selector: 'app-sections-table',
  templateUrl: './sections-table.component.html',
  styleUrls: ['./sections-table.component.scss']
})
export class SectionsTableComponent implements OnInit, OnChanges {

  careers: Career[];
  idCareer: number;
  subjects: Subject[];
  sections: Section[];
  teachers: UserData[] = [];
  dataSource = new MatTableDataSource<Section>(this.sections);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'teacher', 'students', 'options'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input()
  values: Observable<Section[]>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService,
              private teacherService: TeacherService,
              private authService: AuthService) { }

  ngOnInit() {
    // this.loadCareers();
    this.loadTeachers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data: SimpleChange = changes.values;
    if (data.previousValue) {
      this.loadSections();
    }
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    },
    () => {},
    () => {
      this.loadSections();
    });
  }

  loadSections() {
    this.values.subscribe(data => {
      this.sections = data;
    },
    () => {},
    () => {
      this.sections.forEach(element => {
        element.professor = this.teachers.find(t => t.id === element.professorId);
      });
      this.dataSource = new MatTableDataSource<Section>(this.sections);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
          this.loadSections();
        });
      }
    });
  }

  goToSchedule(sectionId: number) {
    sessionStorage.setItem('career', '' + this.idCareer);
    this.router.navigateByUrl('resources/subjects/' + sectionId + '/schedule');
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }

}

import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subject, Section, Career, UserData, UserType } from '../../../../models';
import { MatDialog } from '@angular/material/dialog';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { Router } from '@angular/router';
import { AuthService, SectionService, TeacherService, SubjectsService, CareerService, ToastService } from '../../../../services';
import { Observable, of } from 'rxjs';
import { CompletedCareerComponent } from '../completed-career/completed-career.component';
import { UploadFileDialogComponent } from '../upload-file-dialog/upload-file-dialog.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';

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
  career: Career;
  teacher: UserData;
  nameToShow: string;
  loaded$: Observable<Career>;
  data: Observable<Section[]>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private careerService: CareerService,
              private subjectService: SubjectsService,
              private sectionService: SectionService,
              private teacherService: TeacherService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadTeachers();
  }
  loadRole() {
    const role = this.authService.getRole();
    const userId = this.authService.getId();


    if (role === UserType.Professor) {
      this.teacher = this.teachers.find(t => t.id === this.authService.getId());
      this.nameToShow = this.teacher.name;
      this.data = this.sectionService.getByTeacher(userId);
    } else if (role === UserType.Director) {
      // let career: Career;
      this.careerService.getCareerByTeacher(userId).subscribe(data => {
        this.career = data;
        this.changeDetector.markForCheck();
        this.idCareer = this.career.id;
        this.nameToShow = this.career.name;
      },
      () => {},
      () => {
        this.loaded$ = this.careerService.getCareerByTeacher(userId);
        sessionStorage.setItem('career', '' + this.career.id);
        this.data = this.careerService.getSectionsByCareer(this.career.id);
      });
    } else if (role === UserType.Admin || role === UserType.Student) {
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
        if (previousCareer && (this.authService.getRole() === UserType.Admin || this.authService.getRole() === UserType.Student )) {
          this.idCareer = previousCareer;
        } else {
        }
        this.loadCareers();
        this.loadRole();
      });
  }

  loadCareers() {
    this.careerService.getCareers().subscribe(data => {
      this.careers = data;
      const career = this.careers.find(c => c.id === this.idCareer);
      if (career) {
        this.career = career;
        this.changeDetector.markForCheck();
      }
    },
    () => {},
    () => {
      if (this.isAdmin() || this.isDirector() || this.isStudent()) {
        if (this.career) {
          this.nameToShow = this.career.name;
        }
      }
    });
  }

  careerChange() {
    console.log('career change');
    sessionStorage.setItem('career', '' + this.idCareer);
    const career = this.careers.find(c => c.id === this.idCareer);
    if (career) {
      this.career = career;
      this.changeDetector.markForCheck();
      this.nameToShow = this.career.name;
      this.subjects = career.subjects;
      const sections = [];
      this.subjects.forEach(s => {
        if (s.sections) {
          s.sections.forEach(section => {
            const professor = this.teachers.find(t => t.id === section.professorId);
            section.professor = professor;
            sections.push(section);
          });
        }
      });
      this.sections = sections;
      this.loadRole(); // to change the data on the table
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
          // this.loadCareers();
          this.loadRole(); // to update the data on the table
        },
        () => {
          this.toastService.error('Error al agregar ramo y secciones');
        },
        () => {
          this.toastService.success('Ramo y secciones agregadas');
        });
      }
    });
  }

  uploadSubjects() {
    const dialogRef = this.dialog.open(UploadFileDialogComponent, {
      data: this.idCareer,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTeachers();
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }

  isDirector(): boolean {
    return this.authService.getRole() === UserType.Director;
  }

  isStudent(): boolean {
    return this.authService.getRole() === UserType.Student;
  }

  changeCompleted() {
    if (this.career.isCompleted === false) {
      const dialogRef = this.dialog.open(CompletedCareerComponent, {
        data: this.career.name,
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.career.isCompleted = !this.career.isCompleted;
          this.careerService.edit(this.career).subscribe(
            data => {},
            () => {
              this.toastService.error('Error al editar carrera');
            },
            () => {
              this.toastService.success('Carrera editada');
            });
        }
      });
    } else {
      this.career.isCompleted = !this.career.isCompleted;
    }
  }

  clearSubjects() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'todas las secciones de la carrera',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.careerService.clearSubject(this.idCareer).subscribe(
          () => { },
          () => {
            this.toastService.error('Error al eliminar los ramos y secciones');
           },
          () => {
            this.toastService.success('Ramos y secciones eliminadas');
            this.loadTeachers();
          }
        );
      }
    });
  }
}

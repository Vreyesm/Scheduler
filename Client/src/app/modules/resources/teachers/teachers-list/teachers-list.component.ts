import { Component, OnInit, ViewChild } from '@angular/core';
import {Career, Section, UserData, UserType} from '../../../../models';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { TeacherService, AuthService, ToastService } from '../../../../services';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  careers: Career[];
  idCareer: number;
  teachers: UserData[];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'options'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog,
              private teacherService: TeacherService,
              private authService: AuthService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
      this.dataSource = new MatTableDataSource<UserData>(this.teachers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addTeacher() {
    let user = new UserData();
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '300px',
      data: {
        element: user,
        action: 'Crear'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      user = result;
      if (user) {
        const teacher = new UserData();
        let response;
        this.authService.register(user).subscribe(data => {
          response = data;
        },
        () => {
          this.toastService.error('Error al agregar profesor');
        },
        () => {
          teacher.id = response.id;
          teacher.name = user.name;
          teacher.type = UserType.Professor;
          this.teacherService.add(teacher).subscribe(data => {
            this.loadTeachers();
          },
          () => {
            this.toastService.error('Error al agregar profesor');
          },
          () => {
            this.toastService.success('Profesor registrado');
          });
        });
        /*
        subject.sections.forEach(section => {
          section.name = subject.name + ' - ' + section.name;
        });
        this.subjectService.add(subject, this.idCareer).subscribe(data => {
          this.loadCareers();
        });
        */
      }
    });
  }

  deleteTeacher(teacher: UserData) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: 'Profesor ' + teacher.name,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.teacherService.delete(teacher.id).subscribe(response => {
            this.loadTeachers();
          },
          () => {
            this.toastService.error('Error al eliminar profesor');
          },
          () => {
            this.toastService.success('Profesor editado');
          });
        }
      });
  }
  /*
  editTeacher(teacher: UserData) {
    const oldTeacher: UserData = JSON.parse(JSON.stringify(teacher));
    const dialogRef = this.dialog.open(AddTeacherComponent, {
      width: '300px',
      data: {
        element: oldTeacher,
        action: 'Editar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const newTeacher: UserData = result;
      if (newTeacher) {
        let response;
        this.authService.register(user).subscribe(data => {
          response = data;
        },
        () => {},
        () => {
          teacher.id = response.id;
          teacher.name = user.name;
          teacher.type = UserType.Professor;
          this.teacherService.add(teacher).subscribe(data => {
            this.loadTeachers();
          });
        });
      }
  }*/
}

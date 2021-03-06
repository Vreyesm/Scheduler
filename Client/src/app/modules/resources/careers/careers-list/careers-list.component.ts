import {Component, OnInit, ViewChild} from '@angular/core';
import {Career, UserData, UserType} from '../../../../models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {CareerService, TeacherService, ToastService} from '../../../../services';
import {AddCareerComponent} from '../add-career/add-career.component';
import {DeleteDialogComponent} from '../../../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-careers-list',
  templateUrl: './careers-list.component.html',
  styleUrls: ['./careers-list.component.scss']
})
export class CareersListComponent implements OnInit {

  careers: Career[];
  teachers: UserData[];
  dataSource = new MatTableDataSource<Career>(this.careers);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'options'];

  constructor(public dialog: MatDialog,
              private careerService: CareerService,
              private teacherService: TeacherService,
              private toastService: ToastService) { }

  ngOnInit() {
    this.loadCareers();
    this.loadTeachers();
  }

  loadCareers() {
    this.careerService.getCareers().subscribe(data => {
      this.careers = data;
      this.dataSource = new MatTableDataSource<Career>(this.careers);
      this.dataSource.paginator = this.paginator;
    });
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  addCareer() {
    let career = new Career();
    const dialogRef = this.dialog.open(AddCareerComponent, {
      width: '300px',
      data:
      {
        element: career,
        action: 'Crear'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      career = result;
      if (career) {
        this.careerService.add(career).subscribe(data => {
          this.loadCareers();
        },
        () => {
          this.toastService.error('Error al agregar carrera');
        },
        () => {
          this.toastService.success('Carrera agregada exitosamente');
        });
      }
    });
  }

  editCareer(career: Career) {
    const oldCareer: Career = JSON.parse(JSON.stringify(career));
    const oldTeacher: UserData = this.teachers.find(t => t.id === oldCareer.directorId );

    const dialogRef = this.dialog.open(AddCareerComponent, {
      width: '300px',
      data:
        {
          element: oldCareer,
          action: 'Editar'
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      const newCareer: Career = result;
      if (newCareer) {
        this.careerService.edit(newCareer).subscribe(data => {
          this.loadCareers();
        },
        () => {
          this.toastService.error('Error al editar carrera');
        },
        () => {
          const newTeacher: UserData = this.teachers.find( t => t.id === newCareer.directorId);
          if (oldTeacher !== newTeacher ) {
            console.log('different teacher');
            oldTeacher.type = UserType.Professor; // downgraded
            this.teacherService.update(oldTeacher).subscribe(
              () => { },
              () => {
                this.toastService.error('Error al editar antiguo director');
              },
              () => {
                this.toastService.success('Antiguo director editado exitosamente');
              }
            );
          }
          newTeacher.type = UserType.Director; // ascended
          this.teacherService.update(newTeacher).subscribe(
            () => { },
            () => {
              this.toastService.error('Error al editar antiguo director');
            },
            () => {
              this.toastService.success('Antiguo director editado exitosamente');
            }
          );
          this.toastService.success('Error al editar carrera');
        });
      }
    });
  }

  deleteCareer(career: Career) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'Carrera: ' + career.name,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.careerService.delete(career.id).subscribe(response => {
          this.loadCareers();
        },
        () => {
          this.toastService.error('Error al eliminar carrera');
        },
        () => {
          this.toastService.success('Carrera eliminada exitosamente');
        });
      }
    });
  }
}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Building, Classroom} from '../../../../../models';
import {MatTableDataSource} from '@angular/material/table';
import {AddClassroomComponent} from '../../add-classroom/add-classroom.component';
import {MatDialog} from '@angular/material';
import {ClassroomService, BuildingService, ToastService} from '../../../../../services';
import {DeleteDialogComponent} from '../../../../../components/delete-dialog/delete-dialog.component';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit {

  buildingId: number;
  building: Building;
  displayedColumns: string[] = ['name', 'capacity', 'available', 'options'];

  dataSource: MatTableDataSource<Classroom>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private buildingService: BuildingService,
              private classroomService: ClassroomService,
              private dialog: MatDialog,
              private toastService: ToastService) { }

  ngOnInit() {
    this.buildingId = +this.route.snapshot.paramMap.get('id');
    this.loadBuilding();
  }

  loadBuilding() {
    this.buildingService.getBuilding(this.buildingId).subscribe(data => {
      this.building = data;
      this.dataSource = new MatTableDataSource<Classroom>(this.building.classrooms);
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    });
  }

  addClassroom() {
    let classroom = new Classroom();
    const dialogRefAddClassroom = this.dialog.open(AddClassroomComponent, {
      width: '600px',
      data:
        {
          element: classroom,
          action: 'Crear'
        }
    });
    dialogRefAddClassroom.afterClosed().subscribe(result => {
      if (classroom) {
        classroom = result;
        classroom.buildingId = this.buildingId;
        const data = 'false;false;false;false;false;false;false;false;false;false;false';
        classroom.mondayData = data;
        classroom.tuesdayData = data;
        classroom.wednesdayData = data;
        classroom.thursdayData = data;
        classroom.fridayData = data;
        classroom.saturdayData = data;
        classroom.available = true;
        this.classroomService.add(classroom).subscribe(() => {
          this.loadBuilding();
        },
        () => {
          this.toastService.error('Error al agregar sala');
        },
        () => {
          this.toastService.success('Sala agregada exitosamente');
        });
      }
    });
  }

  editClassroom(classroom: Classroom) {
    const oldClassroom = JSON.parse(JSON.stringify(classroom));
    const dialogRefEditClassroom = this.dialog.open(AddClassroomComponent, {
      width: '600px',
      data:
        {
          element: oldClassroom,
          action: 'Editar'
        }
    });

    dialogRefEditClassroom.afterClosed().subscribe(result => {
      if (result) {
        const newClassroom = result;
        this.classroomService.edit(newClassroom).subscribe(data => {
          this.loadBuilding();
        },
        () => {
          this.toastService.error('Error al editar sala');
        },
        () => {
          this.toastService.success('Sala editada exitosamente');
        });
      }
    });
  }

  deleteClassroom(classroom: Classroom) {
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, {
      data: 'Sala: ' + classroom.name
    });

    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.classroomService.delete(classroom).subscribe(data => {
          this.loadBuilding();
        },
        () => {
          this.toastService.error('Error al eliminar sala');
        },
        () => {
          this.toastService.success('Sala eliminada exitosamente');
        });
      }
    });
  }

  changeAvailable(classroom: Classroom) {
    classroom.available = !classroom.available;
    this.classroomService.edit(classroom).subscribe();
  }

}

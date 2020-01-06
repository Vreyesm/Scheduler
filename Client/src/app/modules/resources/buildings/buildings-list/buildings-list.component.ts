import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { Building, Classroom, UserType} from '../../../../models';
import { AddClassroomComponent } from '../add-classroom/add-classroom.component';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import { AuthService, BuildingService, ClassroomService, ToastService } from './../../../../services';
import { SearchComponent } from '../../../../components/search/search.component';


@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.scss']
})
export class BuildingsListComponent implements OnInit {

  buildings: Building[];
  dataSource = new MatTableDataSource<Building>(this.buildings);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private buildingService: BuildingService,
              private classroomService: ClassroomService,
              private router: Router,
              private auth: AuthService,
              private toastService: ToastService) {
  }

  displayedColumns: string[] = ['name', 'quantity', 'options'];

  ngOnInit() {
    this.loadBuildings();
  }

  addBuilding() {
    let building = new Building();
    const dialogRefAddBuilding = this.dialog.open(AddBuildingComponent, {
      width: '300px',
      data:
        {
          element: building,
          action: 'Crear'
        }
    });
    dialogRefAddBuilding.afterClosed().subscribe(result => {
      building = result;
      if (building) {
        this.buildingService.add(building).subscribe(data => {
          this.loadBuildings();
        },
        () => {
          this.toastService.error('Error al agregar edificio');
        },
        () => {
          this.toastService.success('Edificio agregado exitosamente');
        });
      }
    });
  }

  deleteBuilding(building: Building) {
    const dialogRefDeleteBuilding = this.dialog.open(DeleteDialogComponent, {
      data: 'Edificio: ' + building.name,
    });

    dialogRefDeleteBuilding.afterClosed().subscribe(result => {
      if (result) {
        this.buildingService.delete(building.id).subscribe(response => {
          this.loadBuildings();
        },
        () => {
          this.toastService.error('Error al eliminar edificio');
        },
        () => {
          this.toastService.success('Edificio eliminado exitosamente');
        });
      }
    });
  }

  loadBuildings() {
    return this.buildingService.getBuildings().subscribe(data => {
      this.buildings = data;
      this.dataSource = new MatTableDataSource<Building>(this.buildings);
      this.dataSource.paginator = this.paginator;
    });
  }

  goToBuilding(id: number) {
    this.router.navigateByUrl('resources/buildings/' + id + '/classrooms');
  }

  editBuilding(building: Building) {
    const oldBuilding = JSON.parse(JSON.stringify(building));
    const dialogRefEdit = this.dialog.open(AddBuildingComponent, {
      data:
        {
          element: oldBuilding,
          action: 'Editar',
        }
    });

    dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        const newBuilding = result;
        this.buildingService.edit(newBuilding).subscribe(response => {
          this.loadBuildings();
        },
        () => {
          this.toastService.error('Error al editar edificio');
        },
        () => {
          this.toastService.success('Edificio editado exitosamente');
        });
      }
    });
  }

  searchAvailable() {
    const ref = this.dialog.open(SearchComponent, {
      autoFocus: false,
      width: '700px'
    });

    ref.afterClosed().subscribe(result => {

    });
  }

  isAdmin(): boolean {
    return this.auth.getRole() === UserType.Admin;
  }
}


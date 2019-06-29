import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { Building, Classroom} from '../../../../models';
import { BuildingService } from '../../../../services/building.service';
import { AddClassroomComponent } from '../add-classroom/add-classroom.component';
import { ClassroomService } from '../../../../services/classroom.service';
import { DeleteDialogComponent } from '../../../../components/delete-dialog/delete-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';

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
              private router: Router) {
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
        });
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBuildingComponent } from '../add-building/add-building.component';
import {Building, Classroom} from '../../../../models';
import { BuildingService } from '../../../../services/building.service';
import {AddClassroomComponent} from '../add-classroom/add-classroom.component';
import {ClassroomService} from '../../../../services/classroom.service';

export interface ClassRoom {
  name: string;
  capacity: number;
}

const DATA: ClassRoom [] = [
  {name: 'Sala 11', capacity: 50},
  {name: 'Sala 12', capacity: 50},
  {name: 'Sala 13', capacity: 50},
  {name: 'Sala 14', capacity: 50},
  {name: 'Sala 21', capacity: 50},
  {name: 'Sala 22', capacity: 50},
  {name: 'Sala 23', capacity: 50},
  {name: 'Sala 24', capacity: 50},
  {name: 'Sala 25', capacity: 50},
];



@Component({
  selector: 'app-buildings-list',
  templateUrl: './buildings-list.component.html',
  styleUrls: ['./buildings-list.component.scss']
})
export class BuildingsListComponent implements OnInit {

  buildings: Building[];

  constructor(public dialog: MatDialog,
              private buildingService: BuildingService,
              private classroomService: ClassroomService) { }

  displayedColumns: string[] = ['name', 'capacity', 'options'];
  dataSource = DATA;

  ngOnInit() {
    this.loadBuildings();
  }

  addBuilding() {
    let building = new Building();
    const dialogRefAddBuilding = this.dialog.open(AddBuildingComponent, {
      width: '300px',
      data: building
    });
    dialogRefAddBuilding.afterClosed().subscribe(result => {
      building = result;
      if (building) {
        this.buildingService.addBuilding(building).subscribe(data => {
          console.log(data);
          this.loadBuildings();
        });
      }
    });
  }

  loadBuildings() {
    return this.buildingService.getBuildings().subscribe(data => {
      this.buildings = data;
    });
  }

  addClassroom(id: number) {
    let classroom = new Classroom();
    const dialogRefAddBuilding = this.dialog.open(AddClassroomComponent, {
      width: '300px',
      data: classroom
    });
    dialogRefAddBuilding.afterClosed().subscribe(result => {
      classroom = result;
      classroom.buildingId = id;
      if (classroom) {
        this.classroomService.addClassroom(classroom).subscribe(data => {
          this.loadBuildings();
        });
      }
    });
  }

}

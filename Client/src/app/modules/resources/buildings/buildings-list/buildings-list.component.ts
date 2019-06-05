import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBuildingComponent } from '../add-building/add-building.component';
import { Building } from '../../../../models';
import { BuildingService } from '../../../../services/building.service';

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

  constructor(public dialog: MatDialog,
              private buildingService: BuildingService) { }

  displayedColumns: string[] = ['name', 'capacity', 'options'];
  dataSource = DATA;

  ngOnInit() {
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
        });
      }
    });
  }
}

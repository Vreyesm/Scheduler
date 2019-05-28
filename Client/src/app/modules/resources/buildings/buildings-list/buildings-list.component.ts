import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  displayedColumns: string[] = ['name', 'capacity', 'options'];
  dataSource = DATA;

  ngOnInit() {
  }

}

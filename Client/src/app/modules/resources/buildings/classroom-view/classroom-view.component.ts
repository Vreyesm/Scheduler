import { Component, OnInit } from '@angular/core';

export interface ScheduleBlock {
  block: string;
}

const DATA: ScheduleBlock[] = [
  { block: 'Bloque 1' },
  { block: 'Bloque 2' },
  { block: 'Bloque 3' },
  { block: 'Bloque 4' },
  { block: 'Bloque 5' },
  { block: 'Bloque 6' },
  { block: 'Bloque 7' },
  { block: 'Bloque 8' },
  { block: 'Bloque 9' },
  { block: 'Bloque 10' },
  { block: 'Bloque 11' },
];

@Component({
  selector: 'app-classroom-view',
  templateUrl: './classroom-view.component.html',
  styleUrls: ['./classroom-view.component.scss']
})
export class ClassroomViewComponent implements OnInit {

  displayedColumns: string[] = ['block', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource = DATA;
  class = 'Comunicación Oral y Escrita I';
  professor = 'Profesor con nombre muy largo';
  constructor() { }

  ngOnInit() {
  }

}

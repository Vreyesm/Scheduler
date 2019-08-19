import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Blocks, SectionName, Classroom, Assignation } from '../../models';
import { AssignationService } from '../../services';
import { WeekDay } from '@angular/common';

export interface ScheduleBlock {
  id: number;
  block: string;
}
const DATA: ScheduleBlock[] = [
  { id: 1, block: 'Bloque 1' },
  { id: 2, block: 'Bloque 2' },
  { id: 3, block: 'Bloque 3' },
  { id: 4, block: 'Bloque 4' },
  { id: 5, block: 'Bloque 5' },
  { id: 6, block: 'Bloque 6' },
  { id: 7, block: 'Bloque 7' },
  { id: 8, block: 'Bloque 8' },
  { id: 9, block: 'Bloque 9' },
  { id: 10, block: 'Bloque 10' },
  { id: 11, block: 'Bloque 11' },
];


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = ['block', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource = DATA;

  @Input()
  checks: Blocks;

  @Input()
  textOnTrue: string;

  @Input()
  textOnFalse: string;

  @Input()
  isForClassroom = false;

  @Input()
  idClassroom: number;

  @Output()
  completed = new EventEmitter<Blocks>();

  @Output()
  canceled = new EventEmitter<any>();

  constructor(private assignationService: AssignationService) { }

  ngOnInit() {
  }

  checkButton(list: boolean[], index: number) {
    list[index] = !list[index];
  }

  checked() {
    this.completed.emit(this.checks);
  }

  close() {
    this.canceled.emit(null);
  }
}

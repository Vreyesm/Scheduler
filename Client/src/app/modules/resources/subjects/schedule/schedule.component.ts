import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Blocks, Classroom, Assignation, BlockName, UserType } from '../../../../models';
import { AssignationService, AuthService } from '../../../../services';
import { WeekDay } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AssignationSelectDialogComponent } from '../../../../components/assignation-select-dialog/assignation-select-dialog.component';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

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
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = ['block', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dataSource = DATA;

  @Input()
  checks: Blocks;

  @Input()
  names: BlockName;

  @Input()
  textOnTrue: string;

  @Input()
  textOnFalse: string;

  @Input()
  isForClassroom = false;

  @Input()
  idClassroom: number;

  @Input()
  assignations: Assignation[];

  @Output()
  completed = new EventEmitter<Blocks>();

  @Output()
  assignationsAdded = new EventEmitter<Assignation[]>();

  @Output()
  canceled = new EventEmitter<any>();

  @Output()
  reload = new EventEmitter<any>();

  constructor(private assignationService: AssignationService,
              private authService: AuthService,
              private dialog: MatDialog,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
  }

  get WeekDay() { return WeekDay; }

  checkButton(list: boolean[], index: number, weekday: WeekDay) {
    if (this.isDirector()) {
      list[index] = !list[index];
    }

    if (this.isAdmin() && list[index]) {
      const spanCount = this.countSpan(list, index);
      const dialogRef = this.dialog.open(AssignationSelectDialogComponent, {
        autoFocus: false,
        data: {
          day: weekday,
          block: index,
          span: spanCount,
          previous: this.names.getListByWeekDay(weekday)[index]
        },
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.delete) {
            const assignation = this.assignations.find(a => a.block === index && a.day === weekday);
            this.reload.emit(assignation);
          } else {
            const assignations: Assignation[] = result.assignations;
            if (assignations.length !== 0) {
              this.assignationsAdded.emit(assignations);
            }
          }
        }
      });
    }
  }

  private countSpan(list: boolean[], index: number) {
    let span = 0;
    for (let i = index + 1; i < 11 && list[i]; i++) {
      span++;
    }
    return span;
  }

  checked() {
    this.completed.emit(this.checks);
  }

  close() {
    this.canceled.emit(null);
  }

  isAdmin(): boolean {
    return this.authService.getRole() === UserType.Admin;
  }

  isDirector(): boolean {
    return this.authService.getRole() === UserType.Director;
  }
}

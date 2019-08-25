import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeekDay } from '@angular/common';
import { BrowserStack } from 'protractor/built/driverProviders';
import { ClassroomService } from '../../services';
import { Classroom } from '../../models';

interface Data {
  day: WeekDay;
  block: number;
  span: number;
}

@Component({
  selector: 'app-assignation-select-dialog',
  templateUrl: './assignation-select-dialog.component.html',
  styleUrls: ['./assignation-select-dialog.component.scss']
})
export class AssignationSelectDialogComponent implements OnInit, AfterViewInit {

  dayText: string;
  classrooms: Classroom[];
  classroomsWithSpan: Classroom[];
  classroom: Classroom;
  classroomWithSpan: Classroom;

  constructor(public dialogRef: MatDialogRef<AssignationSelectDialogComponent>,
              private classroomService: ClassroomService,
              @Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit() {
    this.loadDayText();
    setTimeout(() => {this.loadClassrooms(); }, 0);
    // this.loadClassrooms();

  }

  ngAfterViewInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  loadDayText() {
    switch (this.data.day) {
      case WeekDay.Monday:
        this.dayText = 'Lunes';
        break;
      case WeekDay.Tuesday:
        this.dayText = 'Martes';
        break;
      case WeekDay.Wednesday:
        this.dayText = 'Miércoles';
        break;
      case WeekDay.Thursday:
        this.dayText = 'Jueves';
        break;
      case WeekDay.Friday:
        this.dayText = 'Viernes';
        break;
      case WeekDay.Saturday:
        this.dayText = 'Sábado';
        break;
    }
  }

  loadClassrooms() {
    this.classroomService.getAllAvailable(this.data.day, this.data.block, 0).subscribe(data => {
      this.classrooms = data;
    });
    this.classroomService.getAllAvailable(this.data.day, this.data.block, this.data.span).subscribe(data => {
      this.classroomsWithSpan = data;
    });
  }


}

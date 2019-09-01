import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WeekDay } from '@angular/common';
import { BrowserStack } from 'protractor/built/driverProviders';
import { ClassroomService } from '../../services';
import { Classroom, Assignation } from '../../models';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { stringify } from 'querystring';

interface Data {
  day: WeekDay;
  block: number;
  span: number;
  previous: string;
}

@Component({
  selector: 'app-assignation-select-dialog',
  templateUrl: './assignation-select-dialog.component.html',
  styleUrls: ['./assignation-select-dialog.component.scss']
})
export class AssignationSelectDialogComponent implements OnInit, AfterViewInit {

  singleClassroomControl = new FormControl();
  spanClassroomControl = new FormControl();

  dayText: string;
  classrooms: Classroom[];
  classroomsWithSpan: Classroom[];
  classroom: Classroom;
  filteredClassroom: Observable<Classroom[]>;
  classroomWithSpan: Classroom;
  filteredClassroomWithSpan: Observable<Classroom[]>;
  disabled = true;

  constructor(public dialogRef: MatDialogRef<AssignationSelectDialogComponent>,
              private classroomService: ClassroomService,
              @Inject(MAT_DIALOG_DATA) public data: Data) { }

  ngOnInit() {
    this.loadDayText();
    if (this.data.previous !== '') {
      this.singleClassroomControl.setValue(this.data.previous, {emitEvent: false});
    }
    setTimeout(() => { this.loadClassrooms(); }, 0);
    // this.loadClassrooms();

  }

  private _filterSingle(value: string) {
    const filterValue = value.toLowerCase();
    if (this.classrooms) {
      return this.classrooms.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return this.classrooms;
    }
  }

  selectedSingle() {
    const selectedName = this.singleClassroomControl.value;
    this.classroom = this.classrooms.find(c => c.name === selectedName);
    this.classroomWithSpan = null;
    this.disabled = false;
  }

  clearSingle() {
    this.singleClassroomControl.setValue('');
    this.classroom = null;
    this.disabled = true;
  }

  selectedWithSpan() {
    const selectedName = this.spanClassroomControl.value;
    this.classroomWithSpan = this.classroomsWithSpan.find(c => c.name === selectedName);
    this.classroom = null;
    this.disabled = false;
  }

  clearSpan() {
    this.spanClassroomControl.setValue('');
    this.classroomWithSpan = null;
    this.disabled = true;
  }

  private _filterSpan(value: string) {
    const filterValue = value.toLowerCase();
    return this.classroomsWithSpan.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
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
      this.classrooms = data.sort((a, b) => {
        if (a.capacity > b.capacity) {
          return -1;
        } else if (a.capacity < b.capacity) {
          return 1;
        }
        return 0;
      });
    },
      () => { },
      () => {
        this.classroomService.getAllAvailable(this.data.day, this.data.block, this.data.span).subscribe(data => {
          this.classroomsWithSpan = data.sort((a, b) => {
            if (a.capacity > b.capacity) {
              return -1;
            } else if (a.capacity < b.capacity) {
              return 1;
            }
            return 0;
          });
        },
          () => { },
          () => {
            this.filteredClassroom = this.singleClassroomControl.valueChanges.pipe(
              startWith(''),
              map(value => this._filterSingle(value)),
            );
            this.singleClassroomControl.valueChanges.subscribe(() => {
              if (this.singleClassroomControl.value !== '') {
                this.spanClassroomControl.disable({ emitEvent: false });
              } else {
                this.spanClassroomControl.enable({ emitEvent: false });
              }
            });
            this.filteredClassroomWithSpan = this.spanClassroomControl.valueChanges.pipe(
              startWith(''),
              map(value => this._filterSpan(value))
            );
            this.spanClassroomControl.valueChanges.subscribe(() => {
              if (this.spanClassroomControl.value !== '') {
                this.singleClassroomControl.disable({ emitEvent: false });
              } else {
                this.singleClassroomControl.enable({ emitEvent: false });
              }
            });
          });
      });
  }

  submit() {
    const assignations: Assignation[] = [];
    if (this.singleClassroomControl.enabled) {
      const assignation = new Assignation();
      assignation.classroom = this.classroom;
      assignation.day = this.data.day;
      assignation.block = this.data.block;
      assignations.push(assignation);
    } else {
      for (let i = 0; i <= this.data.span; i++) {
        const assignation = new Assignation();
        assignation.classroom = this.classroomWithSpan;
        assignation.day = this.data.day;
        assignation.block = this.data.block + i;
        assignations.push(assignation);
      }
    }
    this.dialogRef.close({ assignations });
  }
}

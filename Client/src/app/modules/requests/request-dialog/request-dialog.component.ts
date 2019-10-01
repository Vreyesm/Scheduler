import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssignationRequest } from '../../../models';
import { WeekDay } from '@angular/common';

interface DTO {
  request: AssignationRequest;
  available: boolean;
}

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RequestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DTO) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  textOfDay(day: WeekDay): string {
    switch (day) {
      case WeekDay.Monday:
        return 'Lunes';
      case WeekDay.Tuesday:
        return 'Martes';
      case WeekDay.Wednesday:
        return 'Miércoles';
      case WeekDay.Thursday:
        return 'Jueves';
      case WeekDay.Friday:
        return 'Viernes';
      case WeekDay.Saturday:
        return 'Sábado';
    }
  }

}

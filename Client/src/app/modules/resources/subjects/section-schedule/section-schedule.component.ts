import { Component, OnInit, Inject } from '@angular/core';
import { Section } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-section-schedule',
  templateUrl: './section-schedule.component.html',
  styleUrls: ['./section-schedule.component.scss']
})
export class SectionScheduleComponent implements OnInit {
  checks = {
    monday: [false, false, false, false, false, false, false, false, false, false, false],
    tuesday: [false, false, false, false, false, false, false, false, false, false, false],
    wednesday: [false, false, false, false, false, false, false, false, false, false, false],
    thursday: [false, false, false, false, false, false, false, false, false, false, false],
    friday: [false, false, false, false, false, false, false, false, false, false, false],
    saturday: [false, false, false, false, false, false, false, false, false, false, false],
  };
  constructor(public dialogRef: MatDialogRef<SectionScheduleComponent>,
              @Inject(MAT_DIALOG_DATA)public section: Section) { }

  ngOnInit() {
  }

  completed(values) {
    console.log(values);
  }

  close(value) {
    this.dialogRef.close();
  }
}

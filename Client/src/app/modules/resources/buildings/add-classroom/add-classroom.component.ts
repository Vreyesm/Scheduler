import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Classroom} from '../../../../models';

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddClassroomComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Classroom ) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}

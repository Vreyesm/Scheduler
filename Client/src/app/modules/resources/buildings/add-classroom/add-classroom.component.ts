import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Classroom} from '../../../../models';

interface Data {
  element: Classroom;
  action: string;
}

@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.scss']
})
export class AddClassroomComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddClassroomComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data ) { }

  ngOnInit() {
    this.data.element.capacity = 1;
  }

  close(): void {
    this.dialogRef.close();
  }
}

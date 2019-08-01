import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserData } from '../../../../models';

interface Data {
  element: UserData;
  action: string;
}

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTeacherComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}

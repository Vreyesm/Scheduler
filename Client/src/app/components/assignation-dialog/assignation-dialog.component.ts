import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assignation-dialog',
  templateUrl: './assignation-dialog.component.html',
  styleUrls: ['./assignation-dialog.component.scss']
})
export class AssignationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AssignationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AssignationOption) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}

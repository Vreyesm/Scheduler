import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-completed-career',
  templateUrl: './completed-career.component.html',
  styleUrls: ['./completed-career.component.scss']
})
export class CompletedCareerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CompletedCareerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}

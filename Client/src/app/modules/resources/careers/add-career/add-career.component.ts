import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Career } from '../../../../models';

interface Data {
  element: Career;
  action: string;
}

@Component({
  selector: 'app-add-career',
  templateUrl: './add-career.component.html',
  styleUrls: ['./add-career.component.scss']
})
export class AddCareerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCareerComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}

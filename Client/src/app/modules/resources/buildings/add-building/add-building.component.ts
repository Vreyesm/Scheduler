import {Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Building } from '../../../../models';

interface Data {
  element: Building;
  action: string;
}

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBuildingComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}

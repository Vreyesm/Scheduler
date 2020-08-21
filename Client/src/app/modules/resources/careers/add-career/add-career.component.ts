import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Career, UserData } from '../../../../models';
import { TeacherService } from '../../../../services/teacher.service';

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

  teachers: UserData[];
  teacherId: string;

  constructor(public dialogRef: MatDialogRef<AddCareerComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data,
              private teacherService: TeacherService) { }

  ngOnInit() {

    setTimeout(() => {
      this.loadTeachers();
    }, 0);
  }

  close(): void {
    console.log(this.data.element);
    this.dialogRef.close();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

}

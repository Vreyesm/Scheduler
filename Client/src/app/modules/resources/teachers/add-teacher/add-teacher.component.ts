import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserData } from '../../../../models';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

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

  teacherForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  get name() { return this.teacherForm.get('name'); }

  get email() { return this.teacherForm.get('email'); }

  get password() { return this.teacherForm.get('password'); }

  constructor(public dialogRef: MatDialogRef<AddTeacherComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Data,
              private fb: FormBuilder) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.teacherForm.value);
  }

}

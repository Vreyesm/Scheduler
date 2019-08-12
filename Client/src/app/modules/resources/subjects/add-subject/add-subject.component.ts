import { Component, OnInit, Inject } from '@angular/core';
import { DialogData, UserData } from '../../../../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { TeacherService } from '../../../../services/teacher.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  sections: FormArray;
  subjectForm = this.formBuilder.group(
    {
      name: [''],
      sections: this.formBuilder.array(
        [
          this.createSection()
        ]
      )
    }
  );

  teachers: UserData[];

  constructor(public dialogRef: MatDialogRef<AddSubjectComponent>,
              @Inject(MAT_DIALOG_DATA)public data: DialogData,
              private formBuilder: FormBuilder,
              private teacherService: TeacherService) { }

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      students: [''],
      professorId: ['']
    });
  }

  addSection(): void {
    this.sections = this.subjectForm.get('sections') as FormArray;
    this.sections.push(this.createSection());
  }

  getSectionsForm() {
    return this.subjectForm.get('sections') as FormArray;
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.subjectForm.value);
    this.dialogRef.close({data: this.data});
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { DialogData, UserData } from '../../../../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
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
      name: ['', [Validators.required]],
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
    setTimeout(() => {
      this.loadTeachers();
    }, 0);
  }

  loadTeachers() {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      students: [1, [Validators.required, Validators.min(1)]],
      professorId: ['', Validators.required]
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

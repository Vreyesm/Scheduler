import { Component, OnInit, Inject } from '@angular/core';
import { DialogData } from '../../../../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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


  constructor(public dialogRef: MatDialogRef<AddSubjectComponent>,
              @Inject(MAT_DIALOG_DATA)public data: DialogData,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      students: ['']
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

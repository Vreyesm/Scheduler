import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeekDay } from '@angular/common';
import { Section, Building, Classroom, AssignationRequest } from '../../models';
import { MatDialogRef } from '@angular/material';
import { SectionService, AuthService, ClassroomService, AssignationRequestService } from '../../services';


interface Day {
  text: string;
  value: WeekDay;
}


@Component({
  selector: 'app-assignation-special-request',
  templateUrl: './assignation-special-request.component.html',
  styleUrls: ['./assignation-special-request.component.scss']
})
export class AssignationSpecialRequestComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  selectedBlock: number;

  days: Day[] = [{ text: 'Lunes', value: WeekDay.Monday },
  { text: 'Martes', value: WeekDay.Tuesday },
  { text: 'Miércoles', value: WeekDay.Wednesday },
  { text: 'Jueves', value: WeekDay.Thursday },
  { text: 'Viernes', value: WeekDay.Friday },
  { text: 'Sábado', value: WeekDay.Saturday }];
  selectedDay: WeekDay;

  sections: Section[];
  sectionId: number;
  userId: string;
  buildings: Building[];
  selectedClassroom: Classroom;

  constructor(public dialogRef: MatDialogRef<AssignationSpecialRequestComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: Data,
              private sectionService: SectionService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private classroomService: ClassroomService,
              private assignationRequestService: AssignationRequestService) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      section: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      day: ['', Validators.required],
      block: ['', Validators.required],
      span: [1 , [Validators.required, Validators.min(1), Validators.max(11)]],
      classroom: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      comment: ['']
    });
    this.setSpanValidators();
    this.userId = this.authService.getId();
    setTimeout(() => {
      this.loadData();
    }, 0);
  }

  get day() { return this.secondFormGroup.get('day'); }
  get block() { return this.secondFormGroup.get('block'); }
  get span() { return this.secondFormGroup.get('span'); }

  loadData() {
    this.sectionService.getByTeacher(this.userId).subscribe(data => {
      this.sections = data;
    });
  }

  searchForClassrooms() {
    this.classroomService.getAllAvailableByBuilding(this.day.value, this.block.value - 1, this.span.value - 1).subscribe(data => {
      this.buildings = data;
    },
    () => { },
    () => {
      // this.secondFormGroup.get('classroom').setValidators([Validators.required]);
      // this.secondFormGroup.get('classroom').updateValueAndValidity();
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  setSpanValidators() {
    const blockControl = this.secondFormGroup.get('block');
    const spanControl = this.secondFormGroup.get('span');

    this.secondFormGroup.get('block').valueChanges.subscribe(block => {
      if (block) {
        const maxSpan = 11 - (block - 1);
        spanControl.setValidators([Validators.required, Validators.min(1), Validators.max(maxSpan)]);
      }
      spanControl.updateValueAndValidity();
    });
  }

  submit() {
    const request = new AssignationRequest();
    request.classroomId = this.secondFormGroup.get('classroom').value;
    request.sectionId = this.firstFormGroup.get('section').value;
    request.professorId = this.authService.getId();
    request.day = this.day.value;
    request.block = this.block.value;
    request.span = this.span.value;
    request.comment = this.thirdFormGroup.get('comment').value;
    this.assignationRequestService.sendAssignationRequest(request).subscribe(
      () => { },
      () => { },
      () => {
        this.dialogRef.close();
      }
    );
  }

}

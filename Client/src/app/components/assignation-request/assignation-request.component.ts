import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SectionService, AuthService, ClassroomService, AssignationRequestService, TeacherService } from '../../services';
import { Section, Classroom, Building, AssignationRequest, UserData } from '../../models';
import { WeekDay } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';

interface Day {
  text: string;
  value: WeekDay;
}

@Component({
  selector: 'app-assignation-request',
  templateUrl: './assignation-request.component.html',
  styleUrls: ['./assignation-request.component.scss']
})
export class AssignationRequestComponent implements OnInit {

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
  section: Section;
  userId: string;
  buildings: Building[];
  selectedClassroom: Classroom;

  user: UserData;

  constructor(public dialogRef: MatDialogRef<AssignationRequestComponent>,
              // @Inject(MAT_DIALOG_DATA) public data: Data,
              private sectionService: SectionService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private classroomService: ClassroomService,
              private assignationRequestService: AssignationRequestService,
              private teacherService: TeacherService) { }

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
    },
    () => { },
    () => {
      this.teacherService.get(this.userId).subscribe(data => {
        this.user = data;
      });
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
    const observables: Observable<any>[] = [];

    for (let i = 0; i < this.span.value; i++) {
      const request = new AssignationRequest();
      request.classroom = this.secondFormGroup.get('classroom').value;
      request.section = this.firstFormGroup.get('section').value;
      request.professor = this.user;
      request.day = this.day.value;
      request.block = this.block.value - 1 + i;
      request.span = 0;
      request.special = false;
      request.comment = this.thirdFormGroup.get('comment').value;
      observables.push(this.assignationRequestService.sendAssignationRequest(request));
    }

    forkJoin(observables).subscribe(
      () => { },
      () => { },
      () => {
        this.dialogRef.close();
      }
    );
  }

}

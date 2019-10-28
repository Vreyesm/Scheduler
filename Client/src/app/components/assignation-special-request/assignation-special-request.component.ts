import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WeekDay } from '@angular/common';
import { Section, Building, Classroom, AssignationRequest, UserData } from '../../models';
import { MatDialogRef } from '@angular/material';
import { SectionService, AuthService, ClassroomService, AssignationRequestService, TeacherService } from '../../services';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Moment } from 'moment';
import { forkJoin, Observable } from 'rxjs';
interface Day {
  text: string;
  value: WeekDay;
}


@Component({
  selector: 'app-assignation-special-request',
  templateUrl: './assignation-special-request.component.html',
  styleUrls: ['./assignation-special-request.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})
export class AssignationSpecialRequestComponent implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup = this.formBuilder.group({
    requests: this.formBuilder.array(
      [
        this.createRequest()
      ]
    )
  });
  thirdFormGroup: FormGroup;
  requests: FormArray;


  blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  selectedBlock: number;

  days: Day[] = [{ text: 'Lunes', value: WeekDay.Monday },
  { text: 'Martes', value: WeekDay.Tuesday },
  { text: 'Miércoles', value: WeekDay.Wednesday },
  { text: 'Jueves', value: WeekDay.Thursday },
  { text: 'Viernes', value: WeekDay.Friday },
  { text: 'Sábado', value: WeekDay.Saturday }];


  minDate = new Date();

  sections: Section[];
  section: Section;
  userId: string;
  buildings: Building[];
  selectedClassroom: Classroom;
  availableClassrooms = [];

  user: UserData;

  constructor(public dialogRef: MatDialogRef<AssignationSpecialRequestComponent>,
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
    this.thirdFormGroup = this.formBuilder.group({
      comment: ['']
    });
    // this.setSpanValidators();
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

  searchForClassrooms(index) {
    const request = (this.secondFormGroup.get('requests') as FormArray).value[index];
    const date = request.day.toDate();
    const day = date.getDay();
    const block = request.block - 1;

    this.classroomService.getAllAvailableByBuildingOnTime(day, block, date).subscribe(data => {
      this.availableClassrooms[index] = data;
      (this.secondFormGroup.get('requests') as FormArray).controls[index].get('classroom').enable();
    });
    // console.log(requests.value[index].day.toDate());
  }

  createRequest(): FormGroup {
    const form: FormGroup = this.formBuilder.group({
      day: ['', Validators.required],
      block: ['', Validators.required],
      classroom: ['', Validators.required],
    });

    let index = 0;

    form.get('day').valueChanges.subscribe(() => {
      index = (this.secondFormGroup.get('requests') as FormArray).length - 1;
      this.availableClassrooms[index] = null;
      form.get('classroom').setValue('');
    });
    form.get('block').valueChanges.subscribe(() => {
      index = (this.secondFormGroup.get('requests') as FormArray).length - 1;
      this.availableClassrooms[index] = null;
      form.get('classroom').setValue('');
    });
    return form;
  }

  addRequest() {
    this.requests = this.secondFormGroup.get('requests') as FormArray;
    this.requests.push(this.createRequest());
  }

  getRequestsForm() {
    return this.secondFormGroup.get('requests') as FormArray;
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
    // const request = new AssignationRequest();
    const requests = (this.secondFormGroup.get('requests') as FormArray).value;
    const observables: Observable<any>[] = [];
    for (let i = 0; i < requests.length; i++) {
      const request = new AssignationRequest();
      request.classroom = requests[i].classroom;
      request.section = this.firstFormGroup.get('section').value;
      request.professor = this.user;
      request.day = requests[i].day.toDate().getDay();
      request.block = (+requests[i].block) - 1;
      request.span = 0;
      request.special = true;
      request.expiration = requests[i].day.toDate();
      request.comment = this.thirdFormGroup.get('comment').value;
      observables.push( this.assignationRequestService.sendAssignationRequest(request));
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

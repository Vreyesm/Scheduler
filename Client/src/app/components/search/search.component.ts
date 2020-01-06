import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WeekDay } from '@angular/common';
import { ClassroomService } from '../../services';
import { Classroom } from '../../models';


interface Day {
  text: string;
  value: WeekDay;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  selectedBlock: number;

  days: Day[] = [{ text: 'Lunes', value: WeekDay.Monday },
  { text: 'Martes', value: WeekDay.Tuesday },
  { text: 'Miércoles', value: WeekDay.Wednesday },
  { text: 'Jueves', value: WeekDay.Thursday },
  { text: 'Viernes', value: WeekDay.Friday },
  { text: 'Sábado', value: WeekDay.Saturday }];
  selectedDay: WeekDay;

  classrooms: Classroom[];

  constructor(public dialogRef: MatDialogRef<SearchComponent>,
              private formBuilder: FormBuilder,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      day: ['', Validators.required],
      block: ['', Validators.required],
      span: [1 , [Validators.required, Validators.min(1), Validators.max(11)]]
    });
    this.setSpanValidators();
  }

  get day() { return this.searchForm.get('day'); }
  get block() { return this.searchForm.get('block'); }
  get span() { return this.searchForm.get('span'); }

  close(): void {
    this.dialogRef.close();
  }

  setSpanValidators() {
    const blockControl = this.searchForm.get('block');
    const spanControl = this.searchForm.get('span');

    this.searchForm.get('block').valueChanges.subscribe(block => {
      if (block) {
        const maxSpan = 11 - (block - 1);
        spanControl.setValidators([Validators.required, Validators.min(1), Validators.max(maxSpan)]);
      }
      spanControl.updateValueAndValidity();
    });
  }

  search()  {
    this.classroomService.getAllAvailable(this.day.value, this.block.value - 1, this.span.value - 1).subscribe(data => {
        this.classrooms = data;
    });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { Section } from '../../../../models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { SectionService } from '../../../../services/section.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-schedule',
  templateUrl: './section-schedule.component.html',
  styleUrls: ['./section-schedule.component.scss']
})
export class SectionScheduleComponent implements OnInit {
  checks = {
    monday: [false, false, false, false, false, false, false, false, false, false, false],
    tuesday: [false, false, false, false, false, false, false, false, false, false, false],
    wednesday: [false, false, false, false, false, false, false, false, false, false, false],
    thursday: [false, false, false, false, false, false, false, false, false, false, false],
    friday: [false, false, false, false, false, false, false, false, false, false, false],
    saturday: [false, false, false, false, false, false, false, false, false, false, false],
  };

  idSection: number;
  section: Observable<Section>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sectionService: SectionService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-string-literal
    this.section = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.sectionService.get(+params.get('id')))
    );
  }

  completed(values) {
    console.log(values);
    // this.dialogRef.close();
  }

  close(value) {
    // this.dialogRef.close();
  }
}

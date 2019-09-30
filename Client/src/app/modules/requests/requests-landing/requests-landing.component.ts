import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignationRequest, Classroom } from '../../../models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AssignationRequestService } from '../../../services';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-requests-landing',
  templateUrl: './requests-landing.component.html',
  styleUrls: ['./requests-landing.component.scss']
})
export class RequestsLandingComponent implements OnInit {

  requests: AssignationRequest[];
  dataSource = new MatTableDataSource<AssignationRequest>(this.requests);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['teacher', 'section', 'classroom', 'date', 'comment', 'available', 'options'];

  constructor(private assignationRequestService: AssignationRequestService) { }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.assignationRequestService.getAll().subscribe(data => {
      this.requests = data;
      this.dataSource = new MatTableDataSource<AssignationRequest>(this.requests);
      this.dataSource.paginator = this.paginator;
    });
  }

  textOfDay(day: WeekDay): string {
    switch (day) {
      case WeekDay.Monday:
        return 'Lunes';
      case WeekDay.Tuesday:
        return 'Martes';
      case WeekDay.Wednesday:
        return 'Miércoles';
      case WeekDay.Thursday:
        return 'Jueves';
      case WeekDay.Friday:
        return 'Viernes';
      case WeekDay.Saturday:
        return 'Sábado';
    }
  }

  isAvailable(classroom: Classroom, day: WeekDay, block: number): boolean {
    const c = Object.assign(new Classroom(), classroom);
    return c.getListByWeekDay(day)[block] === 'false';
  }
  deleteRequest(request: AssignationRequest) {
    this.assignationRequestService.delete(request.id).subscribe(
      () => { },
      () => { },
      () => {
        const index = this.requests.indexOf(request);
        this.requests.splice(index, 1);
        this.dataSource = new MatTableDataSource<AssignationRequest>(this.requests);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}

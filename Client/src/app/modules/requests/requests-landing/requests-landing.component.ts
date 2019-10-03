import { Component, OnInit, ViewChild } from '@angular/core';
import { AssignationRequest, Classroom } from '../../../models';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AssignationRequestService, ClassroomService } from '../../../services';
import { WeekDay } from '@angular/common';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';

@Component({
  selector: 'app-requests-landing',
  templateUrl: './requests-landing.component.html',
  styleUrls: ['./requests-landing.component.scss']
})
export class RequestsLandingComponent implements OnInit {

  requests: AssignationRequest[];
  dataSource = new MatTableDataSource<AssignationRequest>(this.requests);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['teacher', 'section', 'classroom', 'date', 'available', 'options'];

  constructor(private assignationRequestService: AssignationRequestService,
              private classroomService: ClassroomService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.assignationRequestService.getAll().subscribe(data => {
      this.requests = data;
      this.requests.forEach(request => {
        if (request.special) {
          // tslint:disable-next-line: max-line-length
          this.classroomService.isAvailableOnTime(request.classroom.id, request.day, request.block, request.expiration).subscribe(result => {
            request.available = result;
          });
        } else {
          this.classroomService.isAvailable(request.classroom.id, request.day, request.block).subscribe(result => {
            request.available = result;
          });
        }
      });

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


  deleteRequest(request: AssignationRequest) {
    this.assignationRequestService.delete(request.id).subscribe(
      () => { },
      () => { },
      () => {
        const index = this.requests.indexOf(request);
        this.requests.splice(index, 1);
        this.requests.forEach(r => {
          if (r.special) {
            this.classroomService.isAvailableOnTime(r.classroom.id, r.day, r.block, r.expiration).subscribe(result => {
              r.available = result;
            });
          } else {
            this.classroomService.isAvailable(r.classroom.id, r.day, r.block).subscribe(result => {
              r.available = result;
            });
          }
        });
        this.dataSource = new MatTableDataSource<AssignationRequest>(this.requests);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  acceptRequest(request: AssignationRequest) {
    this.assignationRequestService.accept(request.id).subscribe(
      () => { },
      () => { },
      () => {
        this.loadRequests();
      }
    );
  }

  openDialog(request: AssignationRequest, available: boolean) {
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      data: request,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.acceptRequest(request);
      }
    });
  }
}

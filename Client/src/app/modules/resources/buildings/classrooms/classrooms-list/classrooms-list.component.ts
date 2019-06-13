import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Building, Classroom} from '../../../../../models';
import {BuildingService} from '../../../../../services/building.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AddClassroomComponent} from '../../add-classroom/add-classroom.component';
import {MatDialog} from '@angular/material';
import {ClassroomService} from '../../../../../services/classroom.service';


@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.scss']
})
export class ClassroomsListComponent implements OnInit {

  buildingId: number;
  building: Building;
  displayedColumns: string[] = ['name', 'capacity', 'options'];

  dataSource: MatTableDataSource<Classroom>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
              private buildingService: BuildingService,
              private classroomService: ClassroomService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.buildingId = +this.route.snapshot.paramMap.get('id');
    this.loadBuilding(this.buildingId);
  }

  loadBuilding(id: number) {
    this.buildingService.getBuilding(id).subscribe(data => {
      this.building = data;
      this.dataSource = new MatTableDataSource<Classroom>(this.building.classrooms);
      this.dataSource.paginator = this.paginator;
    });
  }

  addClassroom() {
    let classroom = new Classroom();
    const dialogRefAddClassroom = this.dialog.open(AddClassroomComponent, {
      width: '300px',
      data: classroom
    });
    dialogRefAddClassroom.afterClosed().subscribe(result => {
      classroom = result;
      classroom.buildingId = this.buildingId;
      if (classroom) {
        this.classroomService.addClassroom(classroom).subscribe(data => {
          this.loadBuilding(this.buildingId);
        });
      }
    });
  }

}

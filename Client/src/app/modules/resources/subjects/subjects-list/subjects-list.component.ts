import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, Section, Career } from '../../../../models';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { CareerService } from '../../../../services/career.service';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss']
})
export class SubjectsListComponent implements OnInit {

  careers: Career[];
  idCareer: number;

  subjects = [
    {id: 1, name: 'Calculo', students: 24},
    {id: 2, name: 'Física', students: 24},
    {id: 3, name: 'Formulacion', students: 24},
    {id: 4, name: 'GPT', students: 24},
    {id: 5, name: 'Innovación', students: 24},
  ];
  dataSource: MatTableDataSource<Subject>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'students', 'options'];

  constructor(public dialog: MatDialog,
              private careerService: CareerService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Subject>(this.subjects);
    this.loadCareers();
  }

  loadCareers() {
    this.careerService.getCareers().subscribe(data => {
      this.careers = data;
    });
  }

  careerChange() {
    const career = this.careers.find(c => c.id === this.idCareer);
    console.log(career);
    this.dataSource = new MatTableDataSource<Subject>(career.subjects); 
  }

}

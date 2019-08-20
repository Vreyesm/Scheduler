import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationDialogComponent } from './assignation-dialog.component';

describe('AssignationDialogComponent', () => {
  let component: AssignationDialogComponent;
  let fixture: ComponentFixture<AssignationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

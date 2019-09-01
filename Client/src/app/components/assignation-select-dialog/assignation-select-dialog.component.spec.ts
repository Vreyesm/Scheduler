import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationSelectDialogComponent } from './assignation-select-dialog.component';

describe('AssignationSelectDialogComponent', () => {
  let component: AssignationSelectDialogComponent;
  let fixture: ComponentFixture<AssignationSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

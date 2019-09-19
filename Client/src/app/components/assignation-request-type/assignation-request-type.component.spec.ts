import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationRequestTypeComponent } from './assignation-request-type.component';

describe('AssignationRequestTypeComponent', () => {
  let component: AssignationRequestTypeComponent;
  let fixture: ComponentFixture<AssignationRequestTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationRequestTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationRequestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

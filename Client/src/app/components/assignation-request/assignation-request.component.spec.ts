import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationRequestComponent } from './assignation-request.component';

describe('AssignationRequestComponent', () => {
  let component: AssignationRequestComponent;
  let fixture: ComponentFixture<AssignationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

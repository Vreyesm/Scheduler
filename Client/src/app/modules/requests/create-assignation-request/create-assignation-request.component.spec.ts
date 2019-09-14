import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignationRequestComponent } from './create-assignation-request.component';

describe('CreateAssignationRequestComponent', () => {
  let component: CreateAssignationRequestComponent;
  let fixture: ComponentFixture<CreateAssignationRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAssignationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssignationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignationSpecialRequestComponent } from './assignation-special-request.component';

describe('AssignationSpecialRequestComponent', () => {
  let component: AssignationSpecialRequestComponent;
  let fixture: ComponentFixture<AssignationSpecialRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignationSpecialRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignationSpecialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

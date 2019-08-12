import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionScheduleComponent } from './section-schedule.component';

describe('SectionScheduleComponent', () => {
  let component: SectionScheduleComponent;
  let fixture: ComponentFixture<SectionScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

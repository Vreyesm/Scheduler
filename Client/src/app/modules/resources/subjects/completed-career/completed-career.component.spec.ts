import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCareerComponent } from './completed-career.component';

describe('CompletedCareerComponent', () => {
  let component: CompletedCareerComponent;
  let fixture: ComponentFixture<CompletedCareerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedCareerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

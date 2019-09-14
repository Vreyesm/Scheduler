import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsLandingComponent } from './requests-landing.component';

describe('RequestsLandingComponent', () => {
  let component: RequestsLandingComponent;
  let fixture: ComponentFixture<RequestsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesLandingComponent } from './resources-landing.component';

describe('ResourcesLandingComponent', () => {
  let component: ResourcesLandingComponent;
  let fixture: ComponentFixture<ResourcesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

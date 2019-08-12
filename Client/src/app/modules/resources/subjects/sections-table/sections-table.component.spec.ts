import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsTableComponent } from './sections-table.component';

describe('SectionsTableComponent', () => {
  let component: SectionsTableComponent;
  let fixture: ComponentFixture<SectionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrailsListComponent } from './available-trails-list.component';

describe('AvailableTrailsListComponent', () => {
  let component: AvailableTrailsListComponent;
  let fixture: ComponentFixture<AvailableTrailsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTrailsListComponent]
    });
    fixture = TestBed.createComponent(AvailableTrailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

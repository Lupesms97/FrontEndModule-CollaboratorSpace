import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTrailsComponent } from './available-trails.component';

describe('AvailableTrailsComponent', () => {
  let component: AvailableTrailsComponent;
  let fixture: ComponentFixture<AvailableTrailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTrailsComponent]
    });
    fixture = TestBed.createComponent(AvailableTrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

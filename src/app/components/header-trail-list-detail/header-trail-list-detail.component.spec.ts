import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTrailListDetailComponent } from './header-trail-list-detail.component';

describe('HeaderTrailListDetailComponent', () => {
  let component: HeaderTrailListDetailComponent;
  let fixture: ComponentFixture<HeaderTrailListDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderTrailListDetailComponent]
    });
    fixture = TestBed.createComponent(HeaderTrailListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

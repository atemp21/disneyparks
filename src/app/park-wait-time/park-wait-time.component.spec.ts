import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkWaitTimeComponent } from './park-wait-time.component';

describe('ParkWaitTimeComponent', () => {
  let component: ParkWaitTimeComponent;
  let fixture: ComponentFixture<ParkWaitTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkWaitTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkWaitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

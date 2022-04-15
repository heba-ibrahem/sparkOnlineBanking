import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancstionComponent } from './trancstion.component';

describe('TrancstionComponent', () => {
  let component: TrancstionComponent;
  let fixture: ComponentFixture<TrancstionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrancstionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrancstionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

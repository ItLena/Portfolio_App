import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentPerformanceDialogComponent } from './instrument-performance-dialog.component';

describe('InstrumentPerformanceDialogComponent', () => {
  let component: InstrumentPerformanceDialogComponent;
  let fixture: ComponentFixture<InstrumentPerformanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentPerformanceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentPerformanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

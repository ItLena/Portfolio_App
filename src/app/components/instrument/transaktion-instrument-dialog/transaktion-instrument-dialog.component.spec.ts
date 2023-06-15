import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaktionInstrumentDialogComponent } from './transaktion-instrument-dialog.component';

describe('TransaktionInstrumentDialogComponent', () => {
  let component: TransaktionInstrumentDialogComponent;
  let fixture: ComponentFixture<TransaktionInstrumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaktionInstrumentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaktionInstrumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

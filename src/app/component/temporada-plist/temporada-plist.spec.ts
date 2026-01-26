import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadaPlist } from './temporada-plist';

describe('TemporadaPlist', () => {
  let component: TemporadaPlist;
  let fixture: ComponentFixture<TemporadaPlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporadaPlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemporadaPlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

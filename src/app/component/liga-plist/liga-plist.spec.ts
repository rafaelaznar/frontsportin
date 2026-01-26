import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaPlist } from './liga-plist';

describe('LigaPlist', () => {
  let component: LigaPlist;
  let fixture: ComponentFixture<LigaPlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigaPlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaPlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

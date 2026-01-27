import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubPlist } from './club-plist';

describe('ClubPlist', () => {
  let component: ClubPlist;
  let fixture: ComponentFixture<ClubPlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubPlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubPlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

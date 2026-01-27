import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoarticuloPlist } from './tipoarticulo-plist';

describe('TipoarticuloPlist', () => {
  let component: TipoarticuloPlist;
  let fixture: ComponentFixture<TipoarticuloPlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoarticuloPlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoarticuloPlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaPlist } from './noticia-plist';

describe('NoticiaPlist', () => {
  let component: NoticiaPlist;
  let fixture: ComponentFixture<NoticiaPlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaPlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaPlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineCalendrarComponent } from './line-calendrar.component';

describe('LineCalendrarComponent', () => {
  let component: LineCalendrarComponent;
  let fixture: ComponentFixture<LineCalendrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineCalendrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineCalendrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

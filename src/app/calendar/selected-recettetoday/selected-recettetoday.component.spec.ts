import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRecettetodayComponent } from './selected-recettetoday.component';

describe('SelectedRecettetodayComponent', () => {
  let component: SelectedRecettetodayComponent;
  let fixture: ComponentFixture<SelectedRecettetodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedRecettetodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRecettetodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

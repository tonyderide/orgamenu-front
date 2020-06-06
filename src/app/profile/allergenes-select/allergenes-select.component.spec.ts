import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenesSelectComponent } from './allergenes-select.component';

xdescribe('AllergenesSelectComponent', () => {
  let component: AllergenesSelectComponent;
  let fixture: ComponentFixture<AllergenesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllergenesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergenesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

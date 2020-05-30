import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapesDetailsComponent } from './etapes-details.component';

describe('EtapesDetailsComponent', () => {
  let component: EtapesDetailsComponent;
  let fixture: ComponentFixture<EtapesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

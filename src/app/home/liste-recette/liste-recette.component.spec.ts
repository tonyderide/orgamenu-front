import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecetteComponent } from './liste-recette.component';

xdescribe('ListeRecetteComponent', () => {
  let component: ListeRecetteComponent;
  let fixture: ComponentFixture<ListeRecetteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRecetteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

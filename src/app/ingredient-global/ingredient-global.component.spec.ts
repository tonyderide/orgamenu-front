import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientGlobalComponent } from './ingredient-global.component';

xdescribe('IngredientGlobalComponent', () => {
  let component: IngredientGlobalComponent;
  let fixture: ComponentFixture<IngredientGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

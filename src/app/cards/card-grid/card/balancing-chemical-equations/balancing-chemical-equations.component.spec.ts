import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancingChemicalEquationsComponent } from './balancing-chemical-equations.component';

describe('BalancingChemicalEquationsComponent', () => {
  let component: BalancingChemicalEquationsComponent;
  let fixture: ComponentFixture<BalancingChemicalEquationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancingChemicalEquationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancingChemicalEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

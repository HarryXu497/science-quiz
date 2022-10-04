import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancingEquationsComponent } from './balancing-equations.component';

describe('BalancingEquationsComponent', () => {
  let component: BalancingEquationsComponent;
  let fixture: ComponentFixture<BalancingEquationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancingEquationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalancingEquationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

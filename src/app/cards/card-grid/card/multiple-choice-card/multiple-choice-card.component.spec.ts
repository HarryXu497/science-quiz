import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceCardComponent } from './multiple-choice-card.component';

describe('MultipleChoiceCardComponent', () => {
  let component: MultipleChoiceCardComponent;
  let fixture: ComponentFixture<MultipleChoiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleChoiceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipleChoiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

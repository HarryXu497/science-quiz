import { TestBed } from '@angular/core/testing';

import { NewCardGuard } from './new-card.guard';

describe('NewCardGuard', () => {
  let guard: NewCardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NewCardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

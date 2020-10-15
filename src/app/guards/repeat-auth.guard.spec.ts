import { TestBed } from '@angular/core/testing';

import { RepeatAuthGuard } from './repeat-auth.guard';

describe('RepeatAuthGuard', () => {
  let guard: RepeatAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RepeatAuthGuard);
  });
});

import { TestBed } from '@angular/core/testing';

import { PublishGuard } from './publish.guard';

describe('PublishGuard', () => {
  let guard: PublishGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublishGuard);
  });
});

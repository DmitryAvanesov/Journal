import { TestBed } from '@angular/core/testing';

import { RepeatAuthGuardService } from './repeat-auth-guard.service';

describe('RepeatAuthGuardService', () => {
  let service: RepeatAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatAuthGuardService);
  });
});

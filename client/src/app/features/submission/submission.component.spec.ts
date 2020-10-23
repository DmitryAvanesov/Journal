import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionComponent } from './submission.component';

describe('SubmissionComponent', () => {
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmissionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    fixture.detectChanges();
  });
});

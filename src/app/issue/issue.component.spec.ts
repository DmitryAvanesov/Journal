import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueComponent } from './issue.component';

describe('IssueComponent', () => {
  let fixture: ComponentFixture<IssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComponent);
    fixture.detectChanges();
  });
});

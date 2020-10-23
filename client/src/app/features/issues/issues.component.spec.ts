import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuesComponent } from './issues.component';

describe('IssuesComponent', () => {
  let fixture: ComponentFixture<IssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    fixture.detectChanges();
  });
});

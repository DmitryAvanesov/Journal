import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSubmissionsForReviewComponent } from './profile-submissions-for-review.component';

describe('ProfileSubmissionsForReviewComponent', () => {
  let fixture: ComponentFixture<ProfileSubmissionsForReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSubmissionsForReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubmissionsForReviewComponent);
    fixture.detectChanges();
  });
});

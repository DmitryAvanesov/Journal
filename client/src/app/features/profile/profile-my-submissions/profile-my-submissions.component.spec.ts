import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMySubmissionsComponent } from './profile-my-submissions.component';

describe('ProfileMySubmissionsComponent', () => {
  let fixture: ComponentFixture<ProfileMySubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileMySubmissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMySubmissionsComponent);
    fixture.detectChanges();
  });
});

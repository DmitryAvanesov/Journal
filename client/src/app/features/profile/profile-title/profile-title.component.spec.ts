import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileTitleComponent } from './profile-title.component';

describe('ProfileTitleComponent', () => {
  let fixture: ComponentFixture<ProfileTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTitleComponent);
    fixture.detectChanges();
  });
});

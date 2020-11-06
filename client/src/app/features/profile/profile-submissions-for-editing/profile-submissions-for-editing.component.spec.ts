import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileSubmissionsForEditingComponent } from './profile-submissions-for-editing.component';

describe('ProfileSubmissionsForEditingComponent', () => {
  let fixture: ComponentFixture<ProfileSubmissionsForEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSubmissionsForEditingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSubmissionsForEditingComponent);
    fixture.detectChanges();
  });
});

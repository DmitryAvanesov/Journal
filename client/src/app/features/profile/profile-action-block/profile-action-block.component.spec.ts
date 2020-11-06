import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileActionBlockComponent } from './profile-action-block.component';

describe('ProfileActionBlockComponent', () => {
  let fixture: ComponentFixture<ProfileActionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileActionBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActionBlockComponent);
    fixture.detectChanges();
  });
});

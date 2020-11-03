import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogDeleteUserComponent } from './dialog-delete-user.component';

describe('DialogDeleteUserComponent', () => {
  let fixture: ComponentFixture<DialogDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteUserComponent);
    fixture.detectChanges();
  });
});

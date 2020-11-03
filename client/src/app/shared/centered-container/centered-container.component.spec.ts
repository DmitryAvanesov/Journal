import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CenteredContainerComponent } from './centered-container.component';

describe('CenteredContainerComponent', () => {
  let fixture: ComponentFixture<CenteredContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CenteredContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenteredContainerComponent);
    fixture.detectChanges();
  });
});

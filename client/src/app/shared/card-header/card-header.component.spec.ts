import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardHeaderComponent } from './card-header.component';

describe('CardHeaderComponent', () => {
  let fixture: ComponentFixture<CardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHeaderComponent);
    fixture.detectChanges();
  });
});

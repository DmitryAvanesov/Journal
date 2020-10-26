import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishComponent } from './publish.component';

describe('PublishComponent', () => {
  let fixture: ComponentFixture<PublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublishComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishComponent);
    fixture.detectChanges();
  });
});

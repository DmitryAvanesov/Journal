import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    fixture.detectChanges();
  });
});

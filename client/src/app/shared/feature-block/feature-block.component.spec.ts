import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureBlockComponent } from './feature-block.component';

describe('FeatureBlockComponent', () => {
  let fixture: ComponentFixture<FeatureBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureBlockComponent);
    fixture.detectChanges();
  });
});

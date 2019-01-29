import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatTooltipModule, MatButtonModule, MatIconModule } from '@angular/material';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarRatingComponent ],
      imports: [
        CommonModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

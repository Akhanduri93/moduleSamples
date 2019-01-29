import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number;
  @Input() disabled: boolean;
  private starCount: number;
  private snackBarDuration = 2000;
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {
    this.starCount = 5;
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  changeRating(rating: number) {
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.rating = rating;
    return false;
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star_rate';
    } else {
      return 'star_border';
    }
  }
}

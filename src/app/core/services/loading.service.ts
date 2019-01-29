import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private value = new Subject<number>();
  total = 0;

  constructor(

  ) {
    this.clear();
  }

  increment(inc: number) {
    if (this.total >= 100) {
      this.total = 0;
    }
    this.total += inc;
    this.value.next(this.total);
  }

  getValue(): Observable<any> {
    return this.value.asObservable();
  }

  clear() {
    this.total = 0;
    this.value.next(this.total);
  }
}

import { Component } from '@angular/core';
import { TimerService } from '../shared/services/timer.service';
import { Subject, Subscription, timer } from 'rxjs';
import { scan, map, takeUntil, share } from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  constructor(private ts : TimerService) { }

  counter = 0 ;
  ss : any;
  mm : any;
  hh : any;
  flag: boolean = false;
  isSingle : boolean = true;
  stop$ : Subject<any> = new Subject();
  checkTimeout : any;

  start() {
    if (!this.flag) {
      this.flag = !this.flag;
      let second: Subscription = timer(0,1000)
        .pipe(
          scan((acc, curr) => (curr ? curr  : curr + acc ), this.counter),
          map(() => this.counter++),
          takeUntil(this.stop$),
          share(),
        )
        .subscribe(
          () => {
            this.ss = this.ts.getSeconds(this.counter);
            this.mm = this.ts.getMinutes(this.counter);
            this.hh = this.ts.getHours(this.counter);
          }
        );
    }
    else {
      this.flag = !this.flag;
      this.stop$.next(false)
    }
  }

  wait() {
    if (this.isSingle){
      this.flag = !this.flag;
      this.isSingle = !this.isSingle;
      this.checkTimeout = setTimeout(() => {
        this.flag = !this.flag;
        this.isSingle = !this.isSingle;
      }, 300);
    }
    else {
      this.isSingle = !this.isSingle
      this.flag = !this.flag;
      this.stop$.next(false)
      this.checkTimeout = clearTimeout();
    }
  }

  reset() {
    this.ss = 0;
    this.mm = 0;
    this.hh = 0;
    this.counter = 0;
  }

}



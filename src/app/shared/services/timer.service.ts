import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  check(num:any){
    return num <= 9 ? '0' + num : num;
  }

  getHours(time: number) : Observable<number> {
    return this.check(Math.floor((time / 60) / 60));
  }

  getMinutes(time: number) : Observable<number> {
    return this.check((Math.floor(time / 60)) % 60);
  }

  getSeconds(time: number): Observable<number> {
    return this.check(time % 60);
  }

  constructor() { }
}

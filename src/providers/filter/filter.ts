import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterProvider {



  private period = new BehaviorSubject<string>('all');//for binding between components "tab-bar" and "reminders-list"
  currentPeriod = this.period.asObservable();//for binding between components "tab-bar" and "reminders-list"

   //for binding between components "tab-bar" and "reminders-list"
   changePeriod(period: string) {
    this.period.next(period);
  }


}

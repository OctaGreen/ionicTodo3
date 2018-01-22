import { Pipe, PipeTransform } from '@angular/core';
import { Reminder } from '../../app/reminder';


/**
 * Generated class for the FilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * Takes a array of reminders data and a string criteria
   *  (all,past,future)
   * and returns reminders according to critetia  
   */
  transform( reminders: Reminder[], criteria: string): Reminder[] {
    let now = Date.now();
    if (!reminders) return [];
    if (!criteria) return [];
    switch(criteria){
      case('all') :{
        return reminders;
      } case ('past') :{
        return reminders.filter(reminder => {
          return (reminder.dateTime < now);
        });
      } case ('future'): {
        return reminders.filter( reminder =>{
          return (reminder.dateTime > now);
        })
      } default: {
        console.log('error: wrong display flag');
        return reminders;
      }
    }
  }
}

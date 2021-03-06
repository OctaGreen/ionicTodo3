import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { Reminder } from '../../app/reminder'

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Injectable()
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */

    
  transform(reminders: Reminder[], searchText: string): Reminder[] {
    
    if (!reminders) return [];
    if (!searchText) return reminders;
    searchText = searchText.toLowerCase();
    return reminders.filter(reminders => {
      if (reminders.tags !== undefined && reminders.title !== undefined && reminders.text !== undefined) {
        return reminders.title.toLowerCase().includes(searchText) //search by title
              || reminders.text.toLowerCase().includes(searchText) //search by text
              || reminders.tags.toString().toLowerCase().includes(searchText);  //search by tags
      } else {
        if(reminders.title !== undefined && reminders.text !== undefined){
        return reminders.title.toLowerCase().includes(searchText) //search by title
              || reminders.text.toLowerCase().includes(searchText) //search by text
        }
      }
    });
  }
  
}

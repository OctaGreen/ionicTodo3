import { Component, Input, ViewChild } from '@angular/core';
import { Reminder } from '../../app/reminder';
import { Card } from 'ionic-angular/components/card/card';
import { ToastController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';

/**
 * Generated class for the ReminderCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reminder-card',
  templateUrl: 'reminder-card.html'
})
export class ReminderCardComponent {

  constructor(public toastCtrl: ToastController, private itemProvider: ItemProvider) {}

  text: string;
  @ViewChild(Card) card: Card;

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Deleted',
      duration: 3000
    });
    toast.present();
  }


  @Input() data: Reminder;


  swipe(event: any){
    if(event.direction == '2'){
      this.presentToast();
      this.itemProvider.removeItem(this.data.key);
    }
  }



}

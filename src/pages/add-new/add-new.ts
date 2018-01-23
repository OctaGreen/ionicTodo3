import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Item, ItemProvider } from "../../providers/item/item";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { Reminder } from '../../app/reminder';
@IonicPage()
@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html',
})


export class AddNewPage implements OnInit{

  reminder: Reminder = {
    title: '',
    text: '',
    dateTime: 0,
    tags: new Array()
  };

  //for tagsInput
  public tagInput: string = '';
  public tagList: string[] = [];

  date: Date;
  time: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private itemProvider: ItemProvider,
              private localNotifications: LocalNotifications,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewPage');
  }

  // create date in number formart
  createFullDateReminder(reminderDate, reminderTime) {
    return new Date(Date.parse(reminderDate + " " + reminderTime)).getTime();
  }

  addTag(formValue) {
    if (formValue.tagValue !== "") {
      this.tagList.push(formValue.tagValue)
      this.tagInput = ''
    }
  }

  deleteTag(tag: string) {
    for (let i = 0; i < this.tagList.length; i++) {
      if (tag == this.tagList[i]) {
        this.tagList.splice(i, 1);
      }
    }
  }

  onSubmit({ value, valid }: { value: Reminder, valid: boolean }) {
      this.reminder.dateTime = this.createFullDateReminder(this.date, this.time);
      this.reminder.tags = this.tagList;
      console.log(this.reminder);

      this.itemProvider.addItem(new Item(this.reminder.title, this.reminder.text, this.reminder.dateTime, this.reminder.tags));

      this.localNotifications.schedule({
        title: this.reminder.title,
        text: this.reminder.text,
        at: new Date(this.reminder.dateTime)
      });

      this.refreshFields();

      this.navCtrl.parent.select(0);
  }

  //refreshing all fields in form
  refreshFields() {
    this.reminder = {
      title: '',
      text: '',
      dateTime: 0,
      tags: new Array()
    };
    this.date = null;
    this.time = '';
    this.tagInput = '';
    this.tagList = [];
  }
}

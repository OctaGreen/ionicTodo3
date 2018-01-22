import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item, ItemProvider } from "../../providers/item/item";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@IonicPage()
@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html',
})


export class AddNewPage implements OnInit{

  reminder: Reminder = {
    title: '',
    description: '',
    dateTimeOfRemind: 0,
    tags: new Array()
  };

  //for tagsInput
  public tagInput: string = '';
  public tagList: string[] = [];

  date: Date;
  time: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private itemProvider: ItemProvider) {
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
      this.reminder.dateTimeOfRemind = this.createFullDateReminder(this.date, this.time);
      this.reminder.tags = this.tagList;
      console.log(this.reminder);

      this.itemProvider.addItem(new Item(this.reminder.title, this.reminder.description, this.reminder.dateTimeOfRemind, this.reminder.tags));

      this.refreshFields();

      this.navCtrl.parent.select(0);
  }

  //refreshing all fields in form
  refreshFields() {
    this.reminder = {
      title: '',
      description: '',
      dateTimeOfRemind: 0,
      tags: new Array()
    };
    this.date = null;
    this.time = '';
  }

}

export interface Reminder {
  title?: string;
  description?: string;
  dateTimeOfRemind?: number;
  tags?: string[];
}

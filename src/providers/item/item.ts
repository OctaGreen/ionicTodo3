import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';

export class Item {
  title: string;
  text: string;
  dateTime: number;
  tags: any;
  constructor(title, text, dateTime, tags) {
    this.title = title;
    this.text = text;
    this.dateTime = dateTime;
    this.tags = tags;
  }
}

@Injectable()
export class ItemProvider {


  constructor(private db: AngularFireDatabase) {}
  
  addItem(item: Item) {
    this.db.list('/items').push(item);
    console.log('addItem: pushing to db');
  }
  getItemsList() {
    console.log('getItemsList: retrieving from db');
    return this.db.list('/items').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  removeItem(key: string) {
    this.db.list('/items').remove(key).then(response => console.log('item deleted'));
  }
}

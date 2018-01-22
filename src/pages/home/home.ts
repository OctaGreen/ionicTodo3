import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: Observable<any[]>;

  constructor(public navCtrl: NavController, private itemProvider: ItemProvider) {}

  ngOnInit() {
    this.items = this.itemProvider.getItemsList();
  }
}

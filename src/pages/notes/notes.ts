import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Reminder } from '../../app/reminder';
import { ItemProvider } from '../../providers/item/item';
import { Content } from 'ionic-angular/components/content/content';
import { FilterProvider } from '../../providers/filter/filter';

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage implements OnInit {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private itemProvider: ItemProvider, private filterProvider: FilterProvider) {
  }

  private searchText: string; // search criteria
  items: Reminder[] = []; // hashed reminders data
  itemsToDisplay: Reminder[] = [];
  private period: string;
  private top = 0;
  private bottom = 0;
  private displayedAll = 0

  @ViewChild(Content) content: Content;


  ngOnInit() {



    this.filterProvider.currentPeriod.subscribe(period => {
      this.period = period;

      //console.log(this.period);


      this.itemProvider.getItemsList().subscribe(items => {
        //check period and return list of necessary reminders
        switch (this.period) {
          case 'all': {
            this.items = [];
            this.items = items.reverse();
            break;
          }
          case 'past': {
            this.items = [];
            items.forEach(element => {
              if (element.dateTime < new Date().getTime()) {// < past
                this.items.push(element);
              }
            });
            this.items.reverse();
            break;
          }
          case 'future': {
            this.items = [];
            items.forEach(element => {
              if (element.dateTime > new Date().getTime()) {// > future
                this.items.push(element);
              }
            });
            this.items.reverse();
            break;
          }
          default:
            this.items = items.reverse();
        }
        this.startRender();
      });

    });
  }

  startRender() {
    this.top = 0;
    (this.items.length > 20 )? this.top = 19 : this.top = this.items.length - 1;
      this.itemsToDisplay = [];
      this.itemsToDisplay = this.itemsToDisplay.concat(this.items.slice(0, this.top+1));
  }


  /**
   * Fires when input is changed, sets new search criteria
   * @param event
   */
  getSearchCriteria(event: any): void {
    console.log(event.target.value);
    this.searchText = event.target.value;

  }

  doInfinite(infiniteScroll) {


    setTimeout(() => {

      //load more items into display array if need be, set the new top of array index
      if(this.items.length > this.top + 1 ){
        this.itemsToDisplay = this.itemsToDisplay.concat(this.items.slice(this.top+1,this.top+10));
        (this.items.length > this.top+11)  ? this.top+=10 : this.top = this.items.length - 1
      }

      if(this.itemsToDisplay.length > 20 ){
        this.itemsToDisplay.reverse();
        for(let i = 0; i < 10; i++){
          this.itemsToDisplay.pop();
        }
        this.itemsToDisplay.reverse();
      }


      //this bastard doesn't work correctly

      //debugger;
      if(this.displayedAll === 2) {
        this.displayedAll = 0
        this.content.scrollToTop();
        this.startRender();

      }

      //if there is nothing more to load, refresh the list
      if(this.top === this.items.length -1) {this.displayedAll++};


      infiniteScroll.complete();
    }, 500);
  }


}

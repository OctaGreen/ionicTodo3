import { Component } from '@angular/core';
import { NotesPage } from '../notes/notes';
import { AddNewPage } from '../add-new/add-new';

import { FilterProvider } from "../../providers/filter/filter";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NotesPage;
  tab2Root = AddNewPage;
  //tab3Root = ContactPage;


  period: string;


  constructor(private filterProvider: FilterProvider) {

  }

  toPast() {
    //console.log("past");
    this.setPeriod("past");
  }

  toFuture() {
    //console.log("future");
    this.setPeriod("future");
  }

  getAll() {
    //console.log("all");
    this.setPeriod("all");
  }

  setPeriod(period: string) {
    this.period = period;
    this.filterProvider.changePeriod(this.period);
  }
}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';

import { TabsPage } from '../pages/tabs/tabs';
import { AddNewPage } from '../pages/add-new/add-new';
import { NotesPage } from '../pages/notes/notes';
import { SearchPipe } from '../pipes/search/search';
import { FilterPipe } from '../pipes/filter/filter';
import { ReminderCardComponent} from '../components/reminder-card/reminder-card'
import { FilterProvider } from '../providers/filter/filter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ItemProvider } from '../providers/item/item';

export const firebaseConfig = {
  apiKey: "AIzaSyCy-bCTWlGaYFajYWMkjcMWWqvKxGpyr7Y",
  authDomain: "ionictodo-8dafd.firebaseapp.com",
  databaseURL: "https://ionictodo-8dafd.firebaseio.com",
  projectId: "ionictodo-8dafd",
  storageBucket: "ionictodo-8dafd.appspot.com",
  messagingSenderId: "797750503119"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    AddNewPage,
    NotesPage,
    ReminderCardComponent,
    SearchPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    TabsPage,
    AddNewPage,
    NotesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ItemProvider,
    FilterProvider
  ]
})
export class AppModule {}

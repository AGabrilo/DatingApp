import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import {TabsModule} from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PaginationModule} from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireModule} from '@angular/fire';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp({apiKey: "AIzaSyCaxkjDYdObg3enEGzH5cawUutETdV7BAE",
    authDomain: "angular-image-gallery-de87b.firebaseapp.com",
    databaseURL: "https://angular-image-gallery-de87b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "angular-image-gallery-de87b",
    storageBucket: "angular-image-gallery-de87b.appspot.com",
    messagingSenderId: "937664650280",
    appId: "1:937664650280:web:4b364927abb10f4fed691d",
    measurementId: "G-BNEBHJ44KT"})
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    AngularFireStorageModule,
    AngularFireModule
  ]
})
export class SharedModule { }

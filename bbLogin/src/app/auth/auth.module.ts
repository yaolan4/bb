import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, // for sending HTTP clients
    FormsModule, // could be template-based or reactive forms
    IonicModule.forRoot(),
    IonicStorageModule.forRoot() // used to work with the browser's local storage in mobile devices
  ]
})
export class AuthModule { }

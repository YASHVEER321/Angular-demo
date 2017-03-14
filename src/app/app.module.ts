import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import {ButtonModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { AppComponent2 } from './app.component2';
import { homeComponent } from './app.component3';
import { AppRoutingModule } from './routing';
import { GlobalService  } from './global-service.service';
@NgModule({
  declarations: [
    AppComponent,
	AppComponent2,
  homeComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

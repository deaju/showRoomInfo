import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { MaterializeModule } from 'angular2-materialize';
import {RoomInfoService} from './room-info.service'
import { HttpModule } from '@angular/http';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [RoomInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

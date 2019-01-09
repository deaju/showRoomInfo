import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import { RoomInfoService } from '../room-info.service'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  dates: string[];
  selectIndex:number = 0;
  label1: string[];
  datas1 = [[],[]];
  label2: string[];
  datas2 = [[],[]];
  datas3 = [[]];
  tempYAxes = [{
    ticks: {
      min: 0,                   //最小値
      max: 100,                  //最大値
      stepSize: 10               //軸間隔
    }
  }];
  presureYAxes = [{
    ticks: {
      beginAtZero:false
    }
  }];
  constructor(private roomInfo:RoomInfoService) { }

  ngOnInit() {
    this.dates= [];
    this.roomInfo.getDate().subscribe((dates:string[])=>{
      this.dates = dates;
      this.setData(dates[0]);
    });
  }
  private setData(date:string){
    this.roomInfo.getRoomInfo(date)
    .subscribe((roomInfo)=>{
      this.label1 = roomInfo['date'];
      this.datas1[0] = roomInfo['humidity'];
      this.datas1[1] = roomInfo['temp'];
    });
    this.roomInfo.getWeatherInfo(date)
    .subscribe((weatherInfo)=>{
      this.label2 = weatherInfo['date'];
      this.datas2[0] = weatherInfo['humidity'];
      this.datas2[1] = weatherInfo['temp'];
      this.datas3[0] = weatherInfo['pressure'];
    });
  }

  setDateOnGraph(index:number){
    this.selectIndex = index;
    let date = this.dates[index];
    this.setData(date);
  }
  isActive(index:number){
    return this.selectIndex == index;
  }

}

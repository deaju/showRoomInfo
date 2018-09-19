import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { RoomInfoService } from '../room-info.service'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit,AfterViewInit {

  @ViewChild('canvas')
  ref: ElementRef;

  @Input()
  data: ChartData;

  @Input()
  options: ChartOptions;

  context: CanvasRenderingContext2D;
  chart: Chart;
  dates: string[];
  selectIndex:number = 0;

  constructor(private roomInfo:RoomInfoService) { }

  ngOnInit() {
    this.initDate();
    this.dates= [];
    this.roomInfo.getDate().subscribe((dates:string[])=>{
      this.dates = dates;
     this.setData(dates[this.selectIndex]);
    });
  }
  private setData(date:string){
    this.roomInfo.getRoomInfo(date)
    .subscribe((roomInfo)=>{
      this.data.labels = roomInfo['date'];
      this.data.datasets[0].data = roomInfo['humidity'];
      this.data.datasets[1].data = roomInfo['temp'];
      this.chart.update();
    });
  }
  private initDate(){
    this.data = {
      labels: [],
      datasets: [{
        label: 'humidity',
        data: [],
        borderColor: 'rgb(255, 0, 0)',
        lineTension: 0, //<===追加
        fill: false,    //<===追加
      },
      {
        label: 'temperature',
        data: [],
        borderColor: 'rgb(255, 8, 8)',
        lineTension: 0, //<===追加
        fill: false,    //<===追加
      }]
    };

    this.options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    };
  }

  ngAfterViewInit() {
    // canvasを取得
    this.context = this.ref.nativeElement.getContext('2d');

    // チャートの作成
    this.chart = new Chart(this.context, {
      type: 'line',     // とりあえず doughnutチャートを表示
      data: this.data,      // データをプロパティとして渡す
      options: this.options // オプションをプロパティとして渡す
    });
  }

  setDateOnGraph(index:number){
    this.selectIndex = index;
    let date = this.dates[index];
    this.setData(date);
    this.chart.update();
  }
  isActive(index:number){
    return this.selectIndex == index;
  }

}

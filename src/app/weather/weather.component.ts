import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';

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

  constructor() { }

  ngOnInit() {
    this.setDate();
    this.dates= ["a","b","c"]
  }
  private setDate(){
    this.data = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        borderColor: 'rgb(255, 0, 0)',
        lineTension: 0, //<===追加
        fill: false,    //<===追加
      },
      {
        label: '',
        data: [13, 10, 3, 5, 2, 3],
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

  setDateOnGraph(index:Number){
    this.data.datasets[index]['data'] = [1, 1, 10, 10, 10, 10];
    this.chart.update();
  }

}

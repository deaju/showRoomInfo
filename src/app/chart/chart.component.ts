import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef,OnChanges} from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { RoomInfoService } from '../room-info.service'

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit,AfterViewInit,OnChanges {

  @ViewChild('canvas')
  ref: ElementRef;

  @Input()
  data: ChartData;

  @Input()
  options: ChartOptions;

  @Input() labels: string[];
  @Input() datas: object[];
  @Input() yAxes:object[];
  isBeginzeros:boolean = false;

  context: CanvasRenderingContext2D;
  chart: Chart;
  selectIndex:number = 0;
  colorList = ['rgb(223, 215, 0)','rgb(255, 163, 0)','rgb(255, 163, 255 )'];

  constructor(private roomInfo:RoomInfoService) { }

  ngOnInit() {
    this.initDate();
  }
  ngOnChanges(){
    this.data.labels = this.labels;
    this.datas.forEach((v,i,_)=>{
      this.data.datasets[i].data = v;
    });
    this.chart.update();
  }
  
  private initDate(){
    this.data = {
      labels: this.labels,
      datasets: [{
        label: 'humidity',
        data: [],
        borderColor: this.colorList[0],
        lineTension: 0, //<===追加
        fill: false,    //<===追加
      },
      {
        label: 'temperature',
        data: [],
        borderColor: this.colorList[1],
        lineTension: 0, //<===追加
        fill: false,    //<===追加
      }]
    };

    this.options = {
      scales: {
        yAxes: this.yAxes
      },
      responsive: true
    };
  }
 
  ngAfterViewInit() {
    // canvasを取得
    this.context = this.ref.nativeElement.getContext('2d');
    this.context.canvas.height = window.innerHeight / 4;

    // チャートの作成
    Chart.defaults.global.defaultFontColor = 'white';
    this.chart = new Chart(this.context, {
      type: 'line',     // とりあえず doughnutチャートを表示
      data: this.data,      // データをプロパティとして渡す
      options: this.options, // オプションをプロパティとして渡す
      fontColor:'white'
    });
  }

  setDateOnGraph(index:number){
    this.selectIndex = index;
    this.chart.update();
  }
  isActive(index:number){
    return this.selectIndex == index;
  }

}


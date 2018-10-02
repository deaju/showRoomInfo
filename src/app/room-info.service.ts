import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers,RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomInfoService {
  constructor(private http:Http) { }
  getRoomInfo(date:String):Observable<any>{
    let url = "http://192.168.0.116"+"/dashbord/api/room-info/"+date;
    return new Observable((observer)=>{
      this.http.get(url)
      .subscribe((res:Response)=>{
        observer.next(res.json()["results"]);
      });
    });
  }
  getWeatherInfo(date:String):Observable<any>{
    let url = "http://192.168.0.116"+"/dashbord/api/weather-info/"+date;
    return new Observable((observer)=>{
      this.http.get(url)
      .subscribe((res:Response)=>{
        observer.next(res.json()["results"]);
      });
    });
  }
  
  getDate():Observable<any>{
    let url = "http://192.168.0.116"+"/dashbord/api/date";
    return new Observable((observer)=>{
      this.http.get(url)
      .subscribe((res:Response)=>{
        observer.next(res.json()["results"]);
      });
    });
  }
}

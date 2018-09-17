import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers,RequestOptions  } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RoomInfoService {

  constructor(private http:Http) { }
  getRoomInfo(date:String):undefined{
    let url = "https://localhost:5000/room-info/"+date
    this.http.get(url)
    .subscribe((res:Response)=>{
    });
    return;
  }
}

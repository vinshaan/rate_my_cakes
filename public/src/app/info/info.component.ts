import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  @Input() getCakeInfo: any;
  sum: any;
  average: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAverage();
    this.getCakesFromService();
  }
  getAverage(){
    this.sum = 0;
    for (var i of this.getCakeInfo.reviews) {
       this.sum += i.rating;
      console.log(i.rating);
    }
    this.average = Math.floor(this.sum / this.getCakeInfo.reviews.length);
    console.log(this.average);
  }

  getCakesFromService() {
    let observable = this._httpService.getCakes()
    observable.subscribe(data => {
      console.log("Got our data!", data);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { NumberSymbol } from '@angular/common';
import {NgForm} from '@angular/forms';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'public';
  cakes = [];
  reviews = [];
  newCake: any;
  newReview = {rating:"", comment: ""};
  selectedCake: any;
  sum: any;
  average: any;

  constructor(private _httpService: HttpService) {
  }
  ngOnInit(){
    this.newCake = {name: "", image_url: ""}
    this.selectedCake = null;
    this.getCakesFromService()
  }
  getCakesFromService() {
    let observable = this._httpService.getCakes()
    observable.subscribe(data => {
      console.log("Got our data!", data);
      this.cakes=data['cakes'];
    })
  }

  getReviewsFromService(){
    let observable = this._httpService.getReviews()
    observable.subscribe(data => {
      this.reviews = data['reviews'];
    })
  }
  

  getCakeInfo(cake){
    this.selectedCake = cake;
    console.log(cake);

  }

  onSubmit(){
    let observable = this._httpService.addCake(this.newCake)
    observable.subscribe(data => {
      console.log(data);
    })
    console.log(this.newCake);
    this.newCake = {name: "", image_url: ""}
    this.getCakesFromService()

  }

  onReviewSubmit(id): void {
    console.log(this.newReview);
    let observable = this._httpService.addReview(id, this.newReview)
    console.log("id is", id);
    observable.subscribe(data => {
      console.log(data)
    })
    console.log(this.newReview);
    this.newReview = {rating: "", comment: ""}
    this.getReviewsFromService()
  }
}

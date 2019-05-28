import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http:HttpClient) { 
    this.getCakes();
  }
  getCakes(){
    return this._http.get('/cakes');
  }

  getReviews(){
    return this._http.get('/reviews');
  }
  addCake(newCake){
    return this._http.post('/cakes', newCake);
  }

  addReview(id, newReview){
    console.log("Here is newReview value", newReview);
    return this._http.post(`/reviews/${id}`, newReview);
  }

}

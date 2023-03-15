import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  adventuresList(categID:any){
    return this.http.get(`${env.domain}adventures/adventures-list/?page_size=200&category_id=${categID}`)
  }

  categories(){
    return this.http.get(`${env.domain}adventures/categories/`)
  }

  adventuresDetails(advID:any){
    return this.http.get(`${env.domain}adventures/adventure/${advID}/`)
  }

  slidersList(){
    return this.http.get(`${env.domain}adventures/sliders/`)
  }

  aboutUs(){
    return this.http.get(`${env.domain}info/about-us/`)
  }

  contactUs(data:any){
    return this.http.post(`${env.domain}info/contact-us/`,data)
  }

  createOrder(data:any){
    return this.http.post(`${env.domain}orders/create-order/`,data)
  }

  calcPrice(data:any){
    return this.http.post(`${env.domain}orders/transportation/price/`,data)
  }

  zones(){
    return this.http.get(`${env.domain}zones/places/?page_size=500`)
  }
}

import { CityComponent } from './city/city.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cities;
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  constructor(private http: HttpClient) { }
  filterData(name): CityComponent["cities"]{
    return CityComponent["cities"];
    };

  getCity(){
    return this.http.get('http://127.0.0.1:8000/main/', {headers: this.httpHeaders});
  }
  getYear(){
    return this.http.get('http://127.0.0.1:8000/year/', {headers: this.httpHeaders});
  }
}

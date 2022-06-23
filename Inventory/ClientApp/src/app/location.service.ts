import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  location!: Location;
  urlRoot: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }
  
  getLocation(locationId: string): Observable<Location> { // locationID takes a string here, but it's a number in db - I don't know if that makes a difference
    console.log(this.urlRoot + "location/getLocation/" + locationId);
    return this.http.get<Location>(this.urlRoot + "location/getLocation/" + locationId);
  }
}

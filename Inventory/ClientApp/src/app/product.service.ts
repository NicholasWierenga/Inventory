import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  urlRoot: string;
  currentUser: string = ""; 
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers,
    responseType: 'text'
  };

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }

  searchProducts(term: string, locationId: string): Observable <Product> {
    console.log("in service");
    return this.http.get<Product>(this.urlRoot + `product/searchProducts/${term}&${locationId}`);
  }
}

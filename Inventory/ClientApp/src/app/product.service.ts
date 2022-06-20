import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  urlRoot: string;

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }

  searchProducts(term: string, locationId: string, productId: string, brand: string): Observable <Product> {
    let endpoint: string = "product/SearchProducts/";
    let amountSearched: number = 0;

    if (term != "") {
      endpoint += `&${term}`;
    }
    else {
      endpoint += "&emptyString"; // We can't pass null to the url, so we use some unlikely name for any product, like emptyString
    }
    
    if (locationId != "") {
      endpoint += `&${locationId}`;
    }
    else {
      endpoint += "&emptyString";
    }
      
    if (productId != "") {
      endpoint += `&${productId}`;
    }
    else {
      endpoint += "&emptyString";
    }

    if (brand != "") {
      endpoint += `&${brand}`;
    }
    else {
      endpoint += "&emptyString";
    }
    
    return this.http.get<Product>(this.urlRoot + endpoint);
  }

  createFullProduct(): void {

  }
}

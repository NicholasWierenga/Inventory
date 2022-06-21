import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductInv } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  urlRoot: string;
  searchedList!: Product;
  productInvArray: ProductInv[] = [];
  newProductInvArray: ProductInv[] = [];
  fullList!: Product;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers
  };

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }

  searchProducts(term: string, locationId: string, productId: string, brand: string): Observable <Product> {
    let endpoint: string = "product/SearchProducts/";
    this.getProductInv();

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
  
  getProductInv(): void {
    this.http.get<ProductInv[]>(this.urlRoot + "product/showAllProducts/").subscribe((response) => {
      this.productInvArray = response
    });
  }

  mergeProductProductInv(): void {
    this.fullList.data.map(data => {
      data.items.map(item => {
        if (this.productInvArray.find((element) => item.itemId === element.itemId)) { // Checks if we already have a corresponding productInv in the db.
          item.inventory = this.productInvArray.find((element) => item.itemId === element.itemId)!;
        }
        else {
          let newProductInv: ProductInv = {id: undefined!, productName: data.description, itemId: item.itemId, onHand: 5, sales: 5};

          this.newProductInvArray.push(newProductInv);
          item.inventory = newProductInv;
        }
      })
    });

    this.searchedList = this.fullList;

    if (this.newProductInvArray.length > 0) {
      for(let i = 0; i < this.newProductInvArray.length; i++) {
        this.createProductInv(this.newProductInvArray[i]).subscribe();
      }
      
      this.getProductInv();
    }
  }

  createProductInv(newProductInvs: ProductInv): Observable<ProductInv> {
    return this.http.post<ProductInv>(this.urlRoot + "product/createProductInvs/", newProductInvs, this.requestOptions);
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { Item, Product, ProductInv } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  urlRoot: string;
  searchedList!: Product;
  item!: Item;
  productInvArray: ProductInv[] = [];
  newProductInvArray: ProductInv[] = [];
  fullList!: Product;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers
  };

  constructor (private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private locationService: LocationService) {
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

  updateProductInv(id: number, productToUpdate: ProductInv): Observable<ProductInv> {
    return this.http.post<ProductInv>(this.urlRoot + "product/updateProduct/" + id, productToUpdate, this.requestOptions)
  }
  
  getProductInv(): void {
    this.http.get<ProductInv[]>(this.urlRoot + "product/showAllProducts", this.requestOptions).subscribe((response) => {
      this.productInvArray = response;
    });
  }

  mergeProductProductInv(): void {
    this.fullList.data.map(data => {
      data.items.map(item => {
        if (this.productInvArray.find(inventory => item.itemId === inventory.itemId && inventory.locationID == this.locationService.location.data.locationId ) !== undefined) { // Checks if we already have a corresponding productInv in the db.
          item.inventory = this.productInvArray.find(inventory => item.itemId === inventory.itemId && this.locationService.location.data.locationId === inventory.locationID)!;
        }
        else {
          let newProductInv: ProductInv = {id: undefined!, productName: data.description, itemId: item.itemId, 
            onHand: Math.floor(Math.random() * 250), sales: Math.floor(Math.random() * 35), locationID: this.locationService.location.data.locationId};
            
          this.newProductInvArray.push(newProductInv);
          item.inventory = newProductInv;
        }
      })
    });

    this.searchedList = this.fullList;

    if (this.newProductInvArray.length > 0) {
      for(let i = 0; i < this.newProductInvArray.length; i++) {
        this.createProductInv(this.newProductInvArray[i]).subscribe(() => {
          if ( i + 1 === this.newProductInvArray.length) {
            this.getProductInv()
          };
        });
      }
    }
  }

  createProductInv(newProductInvs: ProductInv): Observable<ProductInv> {
    return this.http.post<ProductInv>(this.urlRoot + "product/createProductInvs", newProductInvs, this.requestOptions);
  }
}
import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  searchedList!: Product;

  constructor( public productService: ProductService ) { }

  searchProducts(term: string, locationId: string, productId: string, brand: string, fulfillment: string, limit: number): void {
    this.productService.searchProducts(term, locationId, productId, brand, fulfillment, limit).subscribe((response) => {
      this.searchedList = response;
    });
  }

  ngOnInit(): void {
    let term: string = "yogurt"; // Must have 3 or more characters in order to work.
    let locationId: string = "";
    let productId: string = "";
    let brand: string = "";
    let fulfillment: string = "";
    let limit: number = 5;

    this.searchProducts(term, locationId, productId, brand, fulfillment, limit);
  }
}

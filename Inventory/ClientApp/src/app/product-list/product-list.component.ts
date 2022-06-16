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

  searchProducts(term: string, locationId: string): void {
    this.productService.searchProducts(term, locationId).subscribe((response) => {
      console.log("in comp subscription");
      this.searchedList = response;
    });
  }

  ngOnInit(): void {
    let term: string = "milk";
    let locationId: string = "01400441";
    this.searchProducts(term, locationId);
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  fullList!: Product;
  searchedList!: Product;
  term: string = "yogurt"; // Must have 3 or more characters in order to work.
  locationId: string = "01400441"; // 8 digits, needed for fulfillment and pricing search
  productId: string = "";
  brand: string = "";
  limit: number = 5;
  allUsers!: User[];

  constructor( private productService: ProductService, private userService: UserService ) { }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe((Users) => 
    this.allUsers = Users
    );
  }

  // We may want to add a form to the HTML so we aren't constantly calling the api everytime we update any of the parameters.
  searchProducts(term: string, locationId: string, productId: string, brand: string, limit: number): void {
    this.productService.searchProducts(term, locationId, productId, brand, limit).subscribe((response) => {
      this.fullList = response;
      this.searchedList = response;
      this.searchForFulfillment();
    });
  }

  // Below is a function to filter our api call for a list of products. The api itself has a parameter that filters for
  // these, but that feature gives you all the ones matching your parameters and then products that do not match your search
  // until the list of products reaches the limit set by the user. This method shows only whatever fulfillments the user wants.
  searchForFulfillment(): void {
    let curbsideCheckBox: any = document.getElementById("curbside");
    let deliveryCheckBox: any = document.getElementById("delivery");
    let inStoreCheckBox: any = document.getElementById("inStore");
    let shipToHomeCheckBox: any = document.getElementById("shipToHome");
    
    this.searchedList = Object.assign({}, this.fullList);

    if (curbsideCheckBox.checked) { 
      // This works by taking each element of the data array, then each element of the item array found
      // in each data element, then checking if the fufillment has the correct bool value for curbside.
      this.searchedList.data = this.searchedList.data.filter((item) =>
        item.items.filter((itemInfo) => 
          itemInfo.fulfillment.curbside
        ).length > 0
      ); // This doesn't give us an entirely new Product object, just overwrites what it has for the data array.
    }

    if (deliveryCheckBox.checked) {
      this.searchedList.data = this.searchedList.data.filter((item) =>
        item.items.filter((itemInfo) => 
          itemInfo.fulfillment.delivery
        ).length > 0
      );
    }

    if (inStoreCheckBox.checked) {
      this.searchedList.data = this.searchedList.data.filter((item) =>
        item.items.filter((itemInfo) => 
          itemInfo.fulfillment.inStore
        ).length > 0
      );
    }

    if (shipToHomeCheckBox.checked) {
      this.searchedList.data = this.searchedList.data.filter((item) =>
        item.items.filter((itemInfo) =>
          itemInfo.fulfillment.shipToHome
        ).length > 0
      );
    }
  }

  ngOnInit(): void {
    this.searchProducts(this.term, this.locationId, this.productId, this.brand, this.limit);
  }
}
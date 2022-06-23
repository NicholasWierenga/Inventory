import { Component, OnInit } from '@angular/core';
import { Item, ProductInv } from '../product';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  term: string = "yogurt"; // Must have 3 or more characters in order to work.
  locationId: string = "01400441"; // 8 digits, needed for fulfillment and pricing search
  productId: string = "";
  brand: string = "";
  allUsers: User[] = [];
  badLocationID: boolean = false;

  constructor( public productService: ProductService, public userService: UserService,
    private router: Router, private locationService: LocationService  ) { }

  // We may want to add a form to the HTML so we aren't constantly calling the api everytime we update any of the parameters.
  searchProducts(term: string, locationId: string, productId: string, brand: string): void {
    this.productService.searchProducts(term, locationId, productId, brand).subscribe((response) => {
      this.productService.fullList = response;
      this.productService.searchedList = response;

      this.locationService.getLocation(locationId).subscribe(location => { // gets our location for the items we'll be looking at
        this.locationService.location = location;
        
        this.productService.mergeProductProductInv();
        this.checkBoxSearch();
      });
    });
  } // add a button that when clicked, orders last week's sales for all items low stocked

  // Below is a function to filter our api call for a list of products. The api itself has a parameter that filters for
  // these, but that feature gives all the ones matching your parameters and then products that do not match your search
  // until the list of products reaches the limit set by the user. This method shows only items that match whatever the user wants.
  checkBoxSearch(): void {
    this.badLocationID = false;
    
    let curbsideCheckBox: any = document.getElementById("curbside");
    let deliveryCheckBox: any = document.getElementById("delivery");
    let inStoreCheckBox: any = document.getElementById("inStore");
    let shipToHomeCheckBox: any = document.getElementById("shipToHome");
    let lowStockCheckBox: any = document.getElementById("lowStock");

    if (this.locationId.length != 8 && (curbsideCheckBox.checked || deliveryCheckBox.checked ||
      inStoreCheckBox.checked || shipToHomeCheckBox.checked || lowStockCheckBox.checked)) {
      this.badLocationID = true;
      return;
    }
    
    this.productService.searchedList = Object.assign({}, this.productService.fullList);

    if (curbsideCheckBox.checked) { 
      // This works by taking each element of the data array, then each element of the item array found
      // in each data element, then checking if the fufillment has the correct bool value for curbside.
      this.productService.searchedList.data = this.productService.searchedList.data.filter((data) =>
      data.items.filter((item) => 
        item.fulfillment.curbside
        ).length > 0
      ); // This doesn't give us an entirely new Product object, just overwrites what it has for the data array.
    }

    if (deliveryCheckBox.checked) {
      this.productService.searchedList.data = this.productService.searchedList.data.filter((data) =>
        data.items.filter((item) => 
          item.fulfillment.delivery
          ).length > 0
      );
    }

    if (inStoreCheckBox.checked) {
      this.productService.searchedList.data = this.productService.searchedList.data.filter((data) =>
        data.items.filter((item) => 
          item.fulfillment.inStore
          ).length > 0
      );
    }

    if (shipToHomeCheckBox.checked) {
      this.productService.searchedList.data = this.productService.searchedList.data.filter((data) =>
        data.items.filter((item) =>
          item.fulfillment.shipToHome
          ).length > 0
      );
    }

    if (lowStockCheckBox.checked) {
      this.productService.searchedList.data = this.productService.searchedList.data.filter((data) =>
        data.items.filter((item) =>
          item.inventory.onHand <= item.inventory.sales
          ).length > 0
      );
    }
  }

  orderProduct(item: Item) {
    this.productService.item = item;
    this.router.navigate(['/user-orders']); // Sends us to orders page. 
  }

  ngOnInit(): void {
    this.userService.getUsers();

    if (this.productService.searchedList === undefined) { // The search can take a fair bit of time, so we store the result in the service and only run this once.
      this.searchProducts(this.term, this.locationId, this.productId, this.brand);
    }

    // We have this to make sure searchForFullfillment() doesn't causes us to lose data when go to another page and come back.
    this.productService.searchedList = this.productService.fullList; 
  }
}
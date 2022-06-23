import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { OrdersService } from '../orders.service';
import { Item, ProductInv } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  item: Item = this.productService.item;
  amountOrdered!: number;
  amountTransferred!: number;
  badQuantity: boolean = false;
  badTransfer: boolean = false;
  badTransferQuantity: boolean = false;
  searchedProductInv: ProductInv[] = [];

  constructor( private productService: ProductService, public userService: UserService,
    private orderService: OrdersService, private locationService: LocationService ) { }

  transferProduct(fromItem: ProductInv): void {
    this.badTransfer = false;
    this.badTransferQuantity = false;

    let newOrder = {orderId: undefined!, userId: this.userService.loggedInUser.id,
    quantity: this.amountTransferred, orderDate: new Date(), locationId: this.locationService.location.data.locationId,
    supplier: fromItem.locationID};

    // These ifs are to check if the input is valid.
    if (newOrder.quantity <= 0 || newOrder.quantity === undefined)
      this.badTransferQuantity = true;

    // Checks if making the transfer would cause the other chain to go low-stocked, we dont want those orders to occur, but it could be changed.
    if (fromItem.onHand - this.amountTransferred <= fromItem.sales) 
      this.badTransfer = true;

    if (this.badTransferQuantity || this.badTransfer)
      return; // This kicks us out of the method and will display some error text on the page describing what's wrong to the user.
    
    this.orderService.createOrder(newOrder).subscribe();
    
    this.item.inventory.onHand += this.amountTransferred; // updates our amount ordered from the other facility and adds it to currrent stock.
    this.productService.updateProductInv(this.item.inventory.id, this.item.inventory).subscribe(); // updates current facility's stock.

    fromItem.onHand -= this.amountTransferred; // subtracts our amount ordered from the transferring facility's current stock.
    this.productService.updateProductInv(fromItem.id, fromItem).subscribe(); // updates current sending facility's stock.

    let blankAmount!: number;
    this.amountTransferred = blankAmount; // Used to set the text in the input box to be blank so the placeholder text is shown again.
  }

  orderProduct(): void {
    this.badQuantity = false;
    
    let newOrder = {orderId: undefined!, userId: this.userService.loggedInUser.id,
    quantity: this.amountOrdered, orderDate: new Date(), locationId: this.locationService.location.data.locationId,
    supplier: this.item.soldBy};
    
    if (newOrder.quantity <= 0 || newOrder.quantity === undefined) { // Check if there's data in the order and that it's above 0.
      this.badQuantity = true;
      return;
    }
    
    this.orderService.createOrder(newOrder).subscribe();
    
    this.item.inventory.onHand += this.amountOrdered;
    this.productService.updateProductInv(this.item.inventory.id, this.item.inventory).subscribe();

    let blankAmount!: number;
    this.amountOrdered = blankAmount;
  }

  // Takes the productInvArray from ProductService and searches for all those matching current itemId, but has a differing locationID.
  // This is to know what facilities can transfer items over
  searchProductInv(): void {
    this.searchedProductInv = this.productService.productInvArray.filter(productInv => 
      productInv.itemId === this.item.inventory.itemId && productInv.locationID !== this.item.inventory.locationID
    );
  }

  

  floor(toFloor: number): number { // We can't call Math.floor() in the html, but we can for functions we write.
    return Math.floor(toFloor * 100) / 100;
  }

  ngOnInit(): void {
    this.searchProductInv(); // gets us productInvArray that has matching itemId and differing locationID.
  }
}


// 
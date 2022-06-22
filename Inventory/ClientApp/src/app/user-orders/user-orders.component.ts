import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Item } from '../product';
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
  badQuantity: boolean = false;

  constructor( private productService: ProductService, public userService: UserService, private orderService: OrdersService ) { }

  orderProduct(): void {
    this.badQuantity = false;
    
    let newOrder = {orderId: undefined!, userId: this.userService.loggedInUser.id,
      quantity: this.amountOrdered, orderDate: new Date()};
    

    if (newOrder.quantity <= 0 || newOrder.quantity === undefined) {
      this.badQuantity = true;
      return;
    }
    
    this.orderService.createOrder(newOrder).subscribe();
    
    this.item.inventory.onHand += this.amountOrdered;
    this.productService.updateProductInv(this.item.inventory.id, this.item.inventory).subscribe();

    let blankAmount!: number;
    this.amountOrdered = blankAmount;
  }

  floor(toFloor: number): number { // We can't call Math.floor() in the html, but we can for functions we write.
    return Math.floor(toFloor*100)/100;
  }

  ngOnInit(): void {
  }
}
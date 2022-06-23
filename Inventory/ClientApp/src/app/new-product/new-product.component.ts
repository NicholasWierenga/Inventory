import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductInv } from '../productInv';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../product';


@Component({
  selector: 'app-newproduct',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewproductComponent implements OnInit {
  productId: string = "";
  productName: string ="";
  lowQuant: number = undefined!;
  onHand: number = undefined!;
  sales: number = undefined!;
  itemId: number = undefined!;
  exists: boolean = false;
  nameneeded: boolean = false;


  constructor(public productservice: ProductService, private router: Router) { }

  addProduct(): void{
    this.exists = false;
    this.nameneeded = false;
    let newproduct: ProductInv = {id: undefined!, productName: this.productName, lowQuant: undefined!,
       onHand: undefined!, sales: undefined!, itemId:undefined! };

       if(this.productName.length ===0) {
        this.nameneeded = true;
       }

       if (this.productservice.fullList.data.find((productId) => productId.productId ===this.productId) !== undefined) {
        this.exists = true;

        if (this.nameneeded || this.exists) {
          return;
        }

        this.productservice.createProductInv(newproduct).subscribe(() => {
          this.addProduct();
          this.router.navigate(['']); 
        });
      }

  }

  ngOnInit(): void {
  }

}

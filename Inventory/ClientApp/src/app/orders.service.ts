import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  urlRoot: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
   }
   getOrdersByUserId(id:number){
    return this.http.get<Order[]>(this.urlRoot + "orders/getOrdersById/"+id);
   }
   updateOrder(id:number, body: Order){
    return this.http.post<String>(this.urlRoot + "orders/updateOrder/"+id,body);
   }
   createOrder(o:Order){
    return this.http.put<String>(this.urlRoot + "orders/createOrder/", o);
   }
   deleteOrder(id:number){
    return this.http.delete<String>(this.urlRoot + "orders/deleteOrder/"+id);
   }
}

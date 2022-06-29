import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  urlRoot: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'); // We don't need headers or requestOption, but it makes console less bad.
  requestOptions: Object = {
    headers: this.headers
  };

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.urlRoot = baseUrl;
  }

  getOrdersByUserId(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(this.urlRoot + "order/getOrdersByUserId/"+id, this.requestOptions);
  }

  updateOrder(id: number, body: Order): Observable<Order> {
    return this.http.put<Order>(this.urlRoot + "order/updateOrder/"+ id, body, this.requestOptions);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.urlRoot + "order/createOrder", order, this.requestOptions);
  }
  
  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.urlRoot + "order/deleteOrder/"+ id, this.requestOptions);
  }
}
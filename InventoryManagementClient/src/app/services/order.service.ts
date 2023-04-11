import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderViewModel } from '../models/viewModels/order-view-model';
import { OrderItemViewModel } from '../models/viewModels/order-item-view-model';

const apiUrl:string = "http://localhost:5242/api/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  get():Observable<Order[]>{
    return this.http.get<Order[]>(`${apiUrl}`);
  }
  getVM():Observable<OrderViewModel[]>{
    return this.http.get<OrderViewModel[]>(`${apiUrl}/VM`);
  }
  getWithItems(id:number):Observable<OrderItemViewModel>{
    return this.http.get<OrderItemViewModel>(`${apiUrl}/${id}/OrderItems`)
  }
  insert(data:Order):Observable<Order>{
    return this.http.post(`${apiUrl}`, data)
  }
  update(data:Order):Observable<any>{
    return this.http.put<any>(`http://localhost:5242/api/OrderDb/VM/${data.orderID}`, data)
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/${id}`)
  }
}

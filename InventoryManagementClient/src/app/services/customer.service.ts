import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { CustomerViewModel } from '../models/viewModels/customer-view-model';

const apiUrl:string = "http://localhost:5242/api/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  get():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${apiUrl}`);
  } 
  getVM():Observable<CustomerViewModel[]>{
    return this.http.get<CustomerViewModel[]>(`${apiUrl}/VM`);
  } 
  getById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${apiUrl}/${id}`);
  } 
  insert(data:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${apiUrl}`, data);
  } 
  update(data:Customer):Observable<any>{
    return this.http.put<any>(`${apiUrl}/${data.customerID}`, data);
  } 
  delete(data:Customer):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/${data.customerID}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ImagePathResponse } from '../models/image-path-response';
import { ProductViewModel } from '../models/viewModels/product-view-model';
import { ProductInputModel } from '../models/viewModels/product-input-model';

const apiUrl:string = "http://localhost:5242/api/Product";
const baseUrl:string = 'http://localhost:5242';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  
  //Product

   get():Observable<Product[]>{
    return this.http.get<Product[]>(`${apiUrl}`);
  } 
  getVM():Observable<ProductViewModel[]>{
    return this.http.get<ProductViewModel[]>(`${apiUrl}/VM`);
  } 
  getById(id:number):Observable<Product>{
    return this.http.get<Product>(`${apiUrl}/${id}`);
  } 
  insert(data:ProductInputModel):Observable<Product>{
    return this.http.post<Product>(`${apiUrl}/VM`, data);
  }
  update(data:ProductInputModel):Observable<any>{
    return this.http.put<any>(`${apiUrl}/${data.productID}/VM`, data);
  }
  uploadImage(id: number, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('picture', f);
    //console.log(f);
    return this.http.post<ImagePathResponse>(`${apiUrl}/Upload/${id}`, formData);
  }

  getImage(filename: string): Observable<Blob> {
    //const url = `/api/images/${filename}`;
    const imageUrl = `http://localhost:5242/api/Product/GetImage?filename=${filename}`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  
  delete(data:ProductViewModel):Observable<any>{
    return this.http.delete<any>(`${apiUrl}/${data.productID}`);
  }


}

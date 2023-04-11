import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private payload:any;

  constructor(private http:HttpClient, private router: Router, private jwtHelper: JwtHelperService) {
    this.payload = this.decodedToken();
   }

   signup(user:any){
    return this.http.post<any>(`http://localhost:5242/api/User/RegisterUser`,user);
  }

  login(data:any){
    return this.http.post<any>(`http://localhost:5242/api/User/AuthenticateUser`,data);
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLogedIn():boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.refreshPage();
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();  
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token); 
  }

  getFullNameFromToken(){
    if(this.payload){
      return this.payload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.payload){
      return this.payload.role;
    }
  }

  refreshPage(){
    window.location.reload();
  }
}

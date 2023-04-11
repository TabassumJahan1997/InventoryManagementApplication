import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public fullName: string = "";
  public role: string = "";

  constructor(private auth:AuthenticationService, private userstore: UserStoreService) { }

  ngOnInit() {
    this.userstore.getFullNameFromStore().subscribe((val)=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.userstore.getRoleFromStore().subscribe((val)=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });
  }

  isLoggedIn(){
    if(this.auth.isLogedIn()){
      return true;
    }
    else{
      return false;
    }
  }

  signout(){
    this.auth.signOut();
  }

}

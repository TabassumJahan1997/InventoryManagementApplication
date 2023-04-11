import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InventoryManagementClient';
  showNav = false;

  constructor(
    private auth: AuthenticationService
  ){
    if(auth.isLogedIn()){
      this.showNav = true;
    }
    else{
      this.showNav = false;
    }
  }

  

  


}

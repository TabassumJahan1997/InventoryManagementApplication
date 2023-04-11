import { Injectable } from '@angular/core';
import { CanActivate, Route, Router} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private auth:AuthenticationService,private router: Router, private snackbar: MatSnackBar){

  }

  canActivate():boolean{
    if(this.auth.isLogedIn()){
      return true;
    }
    else{

      const message = 'Please Log in first';

      this.snackbar.open(message, 'DISMISS', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition:'center'
      });
      this.router.navigate(['login']);
      return false;
    }
  }
  
}

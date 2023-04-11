import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  public users: any = [];

  constructor(private api: ApiService, private auth: AuthenticationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.api.getAllUsers().subscribe((res)=>{
      this.users = res;
    },
    (err)=>{

      const message = 'Something went wrong';

      this.snackbar.open(message, 'DISMISS', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition:'center'
          
      });
    });
  }

}

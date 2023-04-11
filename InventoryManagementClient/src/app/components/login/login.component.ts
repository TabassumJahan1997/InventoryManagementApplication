import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { NavbarComponent } from '../shared/nav/navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;

  
  
  constructor(
    private fb:FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private snackBar: MatSnackBar,
    private userstore: UserStoreService,
    //private snackbarService: SnackbarService,
    //private formValidationService: FormValidationService,
    //private appComponent: AppComponent ,
    //private nav:NavbarComponent
    ){}

    public fullName: string = '';
    public role: string = '';

  ngOnInit(): void {

    this.userstore.getFullNameFromStore().subscribe((val)=>{
      let fullNameFromToken = this.auth.getFullNameFromToken();
      this.fullName = val || fullNameFromToken
    });
    this.userstore.getRoleFromStore().subscribe((val)=>{
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken
    });

    //this.appComponent.showNav = false;

    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password:['',Validators.required]
    });
  }

  

  isLoggedIn(){
    this.auth.isLogedIn();
  }

  onLogIn(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      // send object to database
      this.auth.login(this.loginForm.value).subscribe({
         next:(res)=>{
          
          const message = `Successfully logged in as ${this.loginForm.value.username}`;

          this.auth.storeToken(res.token);
          
          const tokenPayload = this.auth.decodedToken();
          this.userstore.setFullNameForStore(tokenPayload.name);
          this.userstore.setRoleForStore(tokenPayload.role);
       
          this.snackBar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
          });

          this.router.navigate(['invoice-view']).then(() => {
            window.location.reload();
          });

        },
        error:(err)=>{

          const message = 'Something went wrong'; 
          this.snackBar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
          });          
        }        
      });
      
    }
    else{
      console.log('Form is not valid');
      ValidateForm.validateAllFormFields(this.loginForm);
       const message = 'Invalid Form';
    }
  }

  refreshPage(){
    window.location.reload();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import ValidateForm from 'src/app/helpers/validateForm';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

 

  signupForm!:FormGroup
  constructor(
    private formbuilder:FormBuilder, 
    private auth:AuthenticationService, 
    private router:Router,
    private snackBar: MatSnackBar,
    //private formValidationService: FormValidationService,
    private  appComponent:AppComponent
    ){}

  ngOnInit(): void {
    //this.appComponent.showNav = false;

    this.signupForm = this.formbuilder.group({
      firstName: ['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);

      // signup logic here

      this.auth.signup(this.signupForm.value).subscribe({
        next:(response=>{

          const message = `Successfully registered as ${this.signupForm.value.userName}`;
          
          this.signupForm.reset();

          this.snackBar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
          });
          this.router.navigate(['login']);
        }),
        error:(err=>{

          const message = 'Something went wrong';

          this.snackBar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
          });
        })
      });
    }
    else{
      console.log('Form is invalid');
      ValidateForm.validateAllFormFields(this.signupForm); 
      const message = 'Form is invalid';

          this.snackBar.open(message, 'DISMISS', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition:'center'
          });
    }
 
  }

}

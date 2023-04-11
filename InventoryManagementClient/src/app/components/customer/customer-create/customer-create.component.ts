import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  constructor(
    private customerservice: CustomerService,
    private snackbar: MatSnackBar
  ) { }

  customer: Customer = {customerName: '', address: '', email: ''};

  customerForm: FormGroup = new FormGroup({
    customerName: new FormControl('',Validators.required),
    address:  new FormControl('',Validators.required),
    email:  new FormControl('',Validators.required)
  });

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  save():void{
    if(this.customerForm.invalid) return;

    Object.assign(this.customer, this.customerForm.value);

    this.customerservice.insert(this.customer).subscribe(r=>{
      this.showMessage('Customer Data Saved');
      this.customerForm.reset();
      // this.customerForm.patchValue(this.customer);
      this.customerForm.markAsUntouched();
       //this.customerForm.markAsPristine();
    },
    err=>{
      this.showMessage('Failed to save data');
    });
  }

  ngOnInit(): void {
  }

}

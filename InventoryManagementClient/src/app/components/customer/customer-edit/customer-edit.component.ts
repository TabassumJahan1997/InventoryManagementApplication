import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  constructor(
    private customerservice: CustomerService,
    private snackbar: MatSnackBar,
    private activatedroute: ActivatedRoute
  ) { }

  customer: Customer = null!;

  customerForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    address:  new FormControl('', Validators.required),
    email:  new FormControl('', Validators.required)
  });

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  update(){
    if(this.customerForm.invalid) return;

    Object.assign(this.customer, this.customerForm.value);

    this.customerservice.update(this.customer).subscribe(r=>{
      this.customerForm.reset();
      this.showMessage('Data Updated');
    },
    err=>{
      this.showMessage('Failed to update data');
    });
  }

  ngOnInit(): void {
    let id: number = this.activatedroute.snapshot.params['id'];

    this.customerservice.getById(id).subscribe(r=>{
      this.customer = r;
      this.customerForm.patchValue(this.customer);
    },
    err=>{
      this.showMessage('Failed to load customer data');
    });
  }

  refreshPage(){
    window.location.reload();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Status } from 'src/app/models/viewModels/status';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {

  constructor(
    private orderservice: OrderService,
    private productservice: DataService,
    private customerservice: CustomerService,
    private snackbar: MatSnackBar
  ) { }

  order: Order = {
    customerID: undefined,
    orderDate: undefined,
    deliveryDate: undefined,
    status: undefined
  };

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  customers: Customer[]=[];
  products: Product[]=[];

  orderStatus: {title: string, value: number}[] = [];

  invoiceForm: FormGroup = new FormGroup({
    customerID: new FormControl(undefined, Validators.required),
    orderDate: new FormControl(undefined, Validators.required),
    deliveryDate:  new FormControl(undefined),
    status:  new FormControl(undefined, Validators.required),
    orderItems:  new FormArray([])
  });

  saveInvoice(){
    if(this.invoiceForm.invalid) return;

    Object.assign(this.order, this.invoiceForm.value);

    this.orderservice.insert(this.order).subscribe(r=>{
        
        this.showMessage('Data Saved');   
    },
    err=>{
      //this.showMessage('Failed to load data');
    });
    this.invoiceForm.reset();
    //this.invoiceForm.markAsPristine();
    this.showMessage('Data Saved');
  }

  get orderItemsFormArray(){
    return this.invoiceForm.controls["orderItems"] as FormArray;
  }

  addItem(){
    this.orderItemsFormArray.push(new FormGroup({
      productID: new FormControl(undefined, Validators.required),
      quantity: new FormControl(undefined, Validators.required)
    }));
  }

  removeItem(index: number){
    if(this.orderItemsFormArray.controls.length> 1){
      this.orderItemsFormArray.removeAt(index);
    }
  }

  ngOnInit(): void {

    this.customerservice.get().subscribe(r=>{
      this.customers = r;
    },
    err=>{
      this.showMessage('Failed to load customers');
    });

    this.productservice.get().subscribe(r=>{
      this.products = r;
    },
    err=>{
      this.showMessage('Failed to load products');
    });

    Object.keys(Status).filter(
      (type)=> isNaN(<any>type) && type !== 'values'
    ).forEach((v:any, i) => {
      this.orderStatus.push({ title: v, value: <any>Status[v] });
    });
    this.addItem();
  }

}

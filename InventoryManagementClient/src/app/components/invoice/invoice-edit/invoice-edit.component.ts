import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';
import { Product } from 'src/app/models/product';
import { Status } from 'src/app/models/viewModels/status';
import { CustomerService } from 'src/app/services/customer.service';
import { DataService } from 'src/app/services/data.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {

  constructor(
    private invoiceService: OrderService,
    private customerService: CustomerService,
    private productService: DataService,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  order: Order = {
    customerID: undefined,
    orderDate: undefined,
    deliveryDate: undefined,
    status: undefined
  }

  customers: Customer[] = [];
  products: Product[] = [];

  orderStatus: {
    title: string,
    value: number
  }[] = [];

  invoiceForm: FormGroup = new FormGroup({
    customerID: new FormControl(undefined, Validators.required),
    orderDate: new FormControl(undefined, Validators.required),
    deliveryDate:  new FormControl(undefined),
    status:  new FormControl(undefined, Validators.required),
    orderItems:  new FormArray([])
  });

  get orderItemsFormArray(){
    return this.invoiceForm.controls['orderItems'] as FormArray;
  }

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  addItem(orderitems?: OrderItem){
    if(orderitems){
      this.orderItemsFormArray.push(new FormGroup({
        productID: new FormControl(orderitems.productID, Validators.required),
        quantity: new FormControl(orderitems.quantity, Validators.required)
      }));
    }
    else{
      this.orderItemsFormArray.push(new FormGroup({
        productID: new FormControl(undefined, Validators.required),
        quantity: new FormControl(undefined, Validators.required)
      }));
    }
  }

  removeItem(index:number){
    if(this.orderItemsFormArray.controls.length > 1){
      this.orderItemsFormArray.removeAt(index);
    }
  }

  updateInvoice(){
    if(this.invoiceForm.invalid) return;

    Object.assign(this.order, this.invoiceForm.value);

    this.invoiceService.update(this.order).subscribe(r=>{
      this.showMessage('Invoice updated');     
    });
    
    this.invoiceForm.reset();
    this.showMessage('Invoice updated');
  }

  ngOnInit(): void {

    let id: number = this.activatedRoute.snapshot.params['id'];

    this.invoiceService.getWithItems(id).subscribe(r=>{
      this.order = r;
      this.invoiceForm.patchValue(this.order);
      this.order.orderItems?.forEach(orderitems=>{
        this.addItem(orderitems);
      });
      console.log(this.invoiceForm.value);
    },
    err=>{
      this.showMessage('Failed to load invoices');
    });


    this.customerService.get().subscribe(r=>{
      this.customers = r;
    },
    err=>{
      this.showMessage('Failed to load customers');
    });


    this.productService.get().subscribe(r=>{
      this.products = r;
    },
    err=>{
      this.showMessage('Failed to load products');
    });


    Object.keys(Status).filter(
      (type)=> isNaN(<any>type)  && type !== 'values'
    ).forEach((v:any, i) => {
      this.orderStatus.push({title: v, value: <any> Status[v]});
    });
  }

}

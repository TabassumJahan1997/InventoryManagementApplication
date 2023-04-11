import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/models/order-item';
import { OrderItemViewModel } from 'src/app/models/viewModels/order-item-view-model';
import { Status } from 'src/app/models/viewModels/status';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {

  constructor(
    private invoiceService: OrderService,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  order: OrderItemViewModel = {};

  datasource = new MatTableDataSource(this.order.orderItems);
  columnList: string[] = ['product', 'price', 'quantity', 'amount'];

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  getOrderStatus(v:any):string{
    return Status[Number(v)];
  }

  ngOnInit(): void {
    this.order.orderItems = [];
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.invoiceService.getWithItems(id).subscribe(r=>{
      this.order = r;
      this.datasource.data = this.order.orderItems as OrderItem[];
    },
    err=>{
      this.showMessage('Failed to load invoice details');
    });
  }

}

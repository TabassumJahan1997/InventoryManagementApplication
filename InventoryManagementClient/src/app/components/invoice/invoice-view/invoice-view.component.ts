import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { OrderViewModel } from 'src/app/models/viewModels/order-view-model';
import { Status } from 'src/app/models/viewModels/status';
import { OrderService } from 'src/app/services/order.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.css']
})
export class InvoiceViewComponent implements OnInit {

  constructor(
    private invoiceservice: OrderService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
    
  ) { }

  orders: OrderViewModel[] = [];
  datasource: MatTableDataSource<OrderViewModel> = new MatTableDataSource(this.orders);
  columnList: string[] = ['customerName', 'orderDate', 'deliveryDate', 'status', 'orderPrice', 'details', 'actions'];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  // get data from enum

  getStatus(value: number): string{
    return Status[value];
  }

  confirmDelete(dataToDelete: OrderViewModel){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(result=>{
      if(result){
        this.invoiceservice.delete(Number(dataToDelete.orderID)).subscribe(r=>{ 
          this.showMessage('Data Deleted');        
          this.datasource.data = this.datasource.data.filter(x=>x.orderID != dataToDelete.orderID);                 
        },
        err=>{
          window.location.reload();
          this.showMessage('Failed to delete data');
          
        });
      }
    });
  }

  // confirmDelete(dataToDelete: OrderViewModel){
  //   this.dialog.open(ConfirmDialogComponent, {
  //     width:'500px'
  //   }).afterClosed().subscribe(result=>{
  //     if(result){
  //       this.invoiceservice.delete(Number(dataToDelete.orderID)).subscribe(()=>{
  //         const index = this.datasource.data.findIndex((d)=> d.orderID == dataToDelete.orderID);
  //         this.datasource.data.splice(index, 1);
  //         this.table.renderRows();
  //       });
  //     }
  //   });
  // }

  // confirmDelete(data: CustomerViewModel){
  //   this.dialog.open(ConfirmDialogComponent, {
  //     width: '500px'
  //   }).afterClosed().subscribe(result=>{
  //     if(result){
  //       this.customerservice.delete(data).subscribe(r=>{
  //         this.showMessage('Customer Deleted');
  //         this.datasource.data = this.datasource.data.filter(x => x.customerID != data.customerID);
  //       },
  //       err=>{
  //         this.showMessage('Failed to delete data');
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    //this.refreshPage();
    this.invoiceservice.getVM().subscribe(r=>{
      this.orders = r;
      this.datasource.data = this.orders;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    },
    err=>{
      this.showMessage('Failed to load invoices');
    });
  }

  // ngAfterViewInit():void{
  //   console.log('called');
  //   this.refreshPage();
  // }

  // applyFilter(filterValue: string){
  //   this.datasource.filter = filterValue.trim().toLocaleLowerCase();
  // }

  refreshPage(){
    window.location.reload();
  }

}

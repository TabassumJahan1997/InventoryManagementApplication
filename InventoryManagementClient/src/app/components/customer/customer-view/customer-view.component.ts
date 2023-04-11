import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { CustomerViewModel } from 'src/app/models/viewModels/customer-view-model';
import { CustomerService } from 'src/app/services/customer.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css']
})
export class CustomerViewComponent implements OnInit {

  constructor(
    private customerservice: CustomerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  customers: CustomerViewModel[]=[];
  columnList: string[] = ['customerName', 'address', 'email', 'actions'];
  datasource: MatTableDataSource<Customer> = new MatTableDataSource(this.customers);
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  confirmDelete(data: CustomerViewModel){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(result=>{
      if(result){
        this.customerservice.delete(data).subscribe(r=>{
          this.showMessage('Customer Deleted');
          this.datasource.data = this.datasource.data.filter(x => x.customerID != data.customerID);
        },
        err=>{
          this.showMessage('Failed to delete data');
        });
      }
    });
  }

  ngOnInit(): void {
    this.customerservice.getVM().subscribe(r=>{
      this.customers = r;
      this.datasource.data = this.customers;
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    },
    err=>{
      this.showMessage('Failed to load data');
    });
  }

}

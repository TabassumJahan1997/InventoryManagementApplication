import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ProductViewModel } from 'src/app/models/viewModels/product-view-model';
// import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
// import { ProductDetailsComponent } from '../product-details/product-details.component';

const baseUrl:string = 'http://localhost:5242';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  

  constructor(
    private productservice: DataService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ){}

  searchTerm: string ='';
  imagePath: string = `${baseUrl}/Pictures`;
  products: ProductViewModel[]=[];
  dataSource: MatTableDataSource<ProductViewModel> = new MatTableDataSource(this.products);
  columnList: string[]=['picture', 'productName', 'price', 'isAvailable', 'details', 'actions'];

  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  confirmDelete(data: ProductViewModel){
    this.dialog.open(ConfirmDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe(result =>{
      if(result){
        this.productservice.delete(data).subscribe(r=>{
          this.showMessage('Product Deleted');
          this.dataSource.data = this.dataSource.data.filter(x=> x.productID != data.productID);
        },
        err=>{
          window.location.reload();
          this.showMessage('Failed to delete data');
        });       
      }
      this.showMessage('Product Deleted');
    });
  }

  // filter() {
  //   const filterValue = this.searchTerm.toLowerCase();
  //   this.dataSource = this.dataSource.data.filter(row =>
  //     row.productName.toLowerCase().includes(filterValue)
  //   );
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
    this.productservice.getVM().subscribe(x=>{
      this.products = x;
      this.dataSource.data = this.products;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


}

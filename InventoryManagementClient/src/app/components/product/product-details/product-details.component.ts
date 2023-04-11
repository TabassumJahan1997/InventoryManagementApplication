import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductViewModel } from 'src/app/models/viewModels/product-view-model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product:Product = {}
  //imageUrl: any;

  constructor(
    private route: ActivatedRoute,
    private productService: DataService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getById(productId).subscribe((product:any)=>{
      this.product = product;
     
    });
  }
}

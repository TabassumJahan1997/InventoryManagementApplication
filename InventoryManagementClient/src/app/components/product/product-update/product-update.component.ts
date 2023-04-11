import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductInputModel } from 'src/app/models/viewModels/product-input-model';
import { DataService } from 'src/app/services/data.service';

const baseUrl:string = 'http://localhost:5242';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})

export class ProductUpdateComponent implements OnInit {

  constructor(
    private productservice: DataService,
    private snackbar: MatSnackBar,
    private activatedroute: ActivatedRoute
  ) { }

  product: Product = null!;
  imagePath: string = baseUrl;

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    isAvailable: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
  });

  file: File = null!;

  update(){
    if(this.productForm.invalid) return;

    let self = this;

    Object.assign(this.product, this.productForm.value);
    console.log(this.product);

    let data: ProductInputModel = {
      productID: this.product.productID,
      productName: this.product.productName,
      price: this.product.price,
      isAvailable: this.product.isAvailable
    }

    this.productservice.update(data).subscribe(x=>{
      this.productForm.reset();
      this.showMessage('Product Updated');
      if(this.file){
        this.updateImage();
      }
    });
  }

  updateImage(){
    let self = this;

    var reader = new FileReader();

    reader.onload = function(e:any){
      self.productservice.uploadImage(Number(self.product.productID), self.file).subscribe(r=>{
        self.showMessage('Image Updated');
      },
      err=>{
        self.showMessage('Failed to update image');
      });
    }
    reader.readAsArrayBuffer(self.file);
  }

  onFileInputChange(event:any):void{
    if(event.target.files.length){
      this.file = event.target.files[0];
      this.productForm.controls['picture'].patchValue(this.file.name);
    }
    else{
      this.productForm.controls['picture'].patchValue("");
    }
  }

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  ngOnInit(): void {
    let id: number = this.activatedroute.snapshot.params['id'];
    this.productservice.getById(id).subscribe(r=>{
      this.product = r;
      this.productForm.patchValue(this.product);
      console.log(this.product);
    },
    err=>{
      this.showMessage('Failed to load data');
    });
  }

}

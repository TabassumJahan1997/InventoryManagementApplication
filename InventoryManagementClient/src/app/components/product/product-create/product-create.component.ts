import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(
    private productservice: DataService,
    private snackbar: MatSnackBar
  ) { }

  product : Product={
    productName: undefined,
    price: undefined,
    isAvailable: undefined
  };

  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    isAvailable: new FormControl('', Validators.required),
    picture: new FormControl('', Validators.required),
  });

  file: File = null!;

  save(){
    if(this.productForm.invalid) return;

    Object.assign(this.product, this.productForm.value)

    var self = this;

    this.productservice.insert(this.product).subscribe(r=>{


      var reader = new FileReader();
      reader.onload = function(e: any){
        console.log(e);
        self.productservice.uploadImage(<number>r.productID, self.file).subscribe(r=>{
          console.log(r);

          const message = 'Image Uploaded Successfully';
          self.showMessage(message);

          self.product.picture = r.imagepath;
          console.log(self.product);
        }, 
        err=>{
          const message = 'Failed to upload image';
          self.showMessage(message);
        });
      }
      reader.readAsArrayBuffer(self.file);

      
      const message = 'Data Saved successfully';
      this.showMessage(message);

      this.productForm.reset();

    },
    err=>{
      const message = 'Failed to save new product';
      this.showMessage(message);
    });
  }

  showMessage(message:string){
    this.snackbar.open(message, 'DISMISS', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition:'center'
    });
  }

  onFileInputChange(event: any):void{
    if(event.target.files.length){
      this.file = event.target.files[0];
      this.productForm.controls['picture'].patchValue(this.file.name);
    }
    else{
      this.productForm.controls['picture'].patchValue("");
    }
  }


  ngOnInit(): void {

  }


}

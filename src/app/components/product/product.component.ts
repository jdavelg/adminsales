import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private _brandService:BrandService,
    private _productService:ProductService
  ) { }

  ngOnInit(): void {
  }

  getProducts(){
    this._brandService.getAll().subscribe(
      response=>{
if (response.status=="success") {
  
}
      },
      error=>{

      }
    )

  }

}

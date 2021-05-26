import { Component, OnInit } from '@angular/core';
import { AnyCnameRecord } from 'dns';
import { Product } from 'src/app/models/product';
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

  public selectedBrand:any
  public brands: any;
  public product: Product
  constructor(
    private _brandService: BrandService,
    private _productService: ProductService
  ) {
    this.product = new Product('', '', '', '', '')
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._brandService.getAll().subscribe(
      response => {
        if (response.status == "success") {
          this.brands = response.brands
        }
      },
      error => {
        console.log(error);

      }
    )

  }

  onSubmit(product: Product) {
    this._productService.save(this.product).subscribe(
      response => {
        if (response.status == "success") {
          Swal.fire(
            'Guardado!',
            'El registro se ha guardado.',
            'success'
          )
          this.getProducts()
        }
      },
      error => {
        Swal.fire(
          'Error!',
          'Error al guardar el registro.',
          'error'
        )
      }
    )

  }

  delete(){
    
  }

}

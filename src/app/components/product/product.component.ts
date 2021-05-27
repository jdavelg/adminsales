import { Component, OnInit, ViewChild } from '@angular/core';

import { Product } from 'src/app/models/product';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2'

import { FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond/filepond.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public selectedBrand: any
  public brands: any;
  public product: Product
  public status: any
  public selectedFile: any = null
  updating: boolean = false
  brandToUpdate: any

  public productUpdate:Product
  constructor(
    private _brandService: BrandService,
    private _productService: ProductService
  ) {
    this.product = new Product('', '', '', '', '');
    this.productUpdate = new Product('', '', '', '', '')
  }
  @ViewChild('myPond') myPond: FilePondComponent | undefined

  pondOptions: FilePondOptions = {
    allowMultiple: false,
    labelIdle: 'Suelta las imagenes o haz click aquí'
  }

  pondFiles: FilePondOptions["files"] = [
    {
      source: 'assets/photo.jpeg',
      options: {
        type: 'local'
      }
    }
  ]

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any): any {
    console.log('A file was added', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event)
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this._brandService.getAll().subscribe(
      response => {
        if (response.status == "success") {
          this.brands = response.marks
          console.log(this.brands);

        }
      },
      error => {
        console.log(error);

      }
    )

  }

  onSubmit(product: any) {
    const fd = new FormData();

    fd.append('image', this.selectedFile, this.selectedFile.name)
    /* {reportProgress:true,
      observe:'events'
    } */

    this._productService.save(this.product).subscribe(
      response => {
        if (response.status == "success") {
          Swal.fire(
            'Guardado!',
            'El registro se ha guardado.',
            'success'
          )
          this.getProducts()
          product.reset()
          this.status = "success"
        }
      },
      error => {
        Swal.fire(
          'Error!',
          'Error al guardar el registro.',
          'error'
        )
        this.status = "error"
      }
    )

  }

  delete(productId: any, brandId: any) {
    Swal.fire({
      title: 'Estas segur@?',
      text: 'Eliminaras el registro y no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, la quiero eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.remove(productId, brandId).subscribe(
          response => {
            if (response.status == "success") {
              this.getProducts()
              Swal.fire(
                'eliminado!',
                'El registro se ha eliminado.',
                'success'
              )

            } else {
              Swal.fire(
                'Cancelado',
                'Error,No se eliminó el registro ',
                'error'
              )
            }

          },
          error => {
            Swal.fire(
              'Cancelado',
              'Error,No se eliminó el registro ',
              'error'
            )
            console.log(error);

          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se eliminó el registro :)',
          'error'
        )
      }
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }

  startUpdating(product: any, brand: any) {
this._productService.getOne(product, brand).subscribe(
  response=>{
if (response.status=="success") {
  this.productUpdate=response.product
  this.updating=true
  this.brandToUpdate=response.brandId
}
  },
  err=>{
console.log(err);

  }
)

  }

  onUpdate(brand: any) {
    console.log(brand);

  }



}

import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  public status: any
  public brand: Brand;
  public brands: any
  public allempty: boolean
  public categories: any
  constructor(
    private _brandService: BrandService,
    private _categoryService: CategoryService
  ) {
    this.brand = new Brand('', '', '', '');
    this.allempty = true

  }

  ngOnInit(): void {
    this.getBrands()
    this.getCategories()
  }

  getBrands() {
    return this._brandService.getAll().subscribe(
      response => {
        console.log(response);

        if (response.status == "success" && response.marks) {
          this.brands = response.marks

        } else {

        }
      },
      error => {
        console.log(error);

      }
    )
  }
  getCategories() {
    this._categoryService.getAll().subscribe(
      response => {
        console.log(response);


        if (response.status == "success") {
          this.categories = response.categories

        }
      },
      error => {
        console.log(error);

      }
    )

  }

  onSubmit(brand: any) {
    console.log(this.brand);
    this._brandService.save(this.brand).subscribe(
      response => {
        if (response.status == "success") {
          brand.reset()
          this.status = "success"
          Swal.fire(
            'Guardado!',
            'El registro se ha guardado.',
            'success'
          )
        }
        this.getBrands()

      },
      error => {
        this.status = "error"
        console.log(error);
        Swal.fire(
          'Error!',
          'El registro no se ha guardado.',
          'error'
        )
      }
    )

  }

  delete(brand: any) {

    Swal.fire({
      title: 'Estas segur@?',
      text: 'Eliminaras el registro y no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, la quiero eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._brandService.delete(brand).subscribe(
          response => {
            if (response.status == "success") {
              this.getBrands()
              Swal.fire(
                'eliminado!',
                'El registro se ha eliminado.',
                'success'
              )
              this.getCategories()
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




}

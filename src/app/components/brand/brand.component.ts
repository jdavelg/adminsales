import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { global } from 'src/app/models/global';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
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
  public updating: boolean = false
  public brandToUpdate: Brand
  public idBrandCategory: any
  selectedFile: File | any;
  constructor(
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.brand = new Brand('', '', '', '');
    this.allempty = true;
    this.brandToUpdate = new Brand('', '', '', '');

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
    let fd = new FormData();

    fd.append('thumbnail', this.selectedFile, this.selectedFile.name)



    this._userService.uploadImage(fd).subscribe(
      response => {
        if (response.path) {
          console.log(response.path);
          let firstPath = response.path

          let pathtoadd = firstPath.split("https://clips-vod-tcs.s3.amazonaws.com/")
          let definitelypath = global.toReplace + pathtoadd[1]
          console.log(definitelypath);

          this.brand.image = definitelypath
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
              this.selectedFile = undefined


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

      },
      error => {
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

  goUpdate(brand: any) {
    this.brandToUpdate = brand;
    console.log(this.brandToUpdate);

    this.updating = true
  }

  onUpdate(brand: any) {

    if (this.selectedFile != undefined && this.selectedFile != null) {
      let fd = new FormData();

      fd.append('thumbnail', this.selectedFile, this.selectedFile.name)

      this._userService.uploadImage(fd).subscribe(
        response => {
          if (response.path) {
            console.log(response.path);
            let firstPath = response.path

            let pathtoadd = firstPath.split("https://clips-vod-tcs.s3.amazonaws.com/")
            let definitelypath = global.toReplace + pathtoadd[1]
            console.log(definitelypath);

            this.brandToUpdate.image = definitelypath
            /* start update */

            this._brandService.update(this.brandToUpdate).subscribe(
              response => {
                if (response.status == "success") {
                  Swal.fire(
                    'Muy bien',
                    'se actualizó el registro ',
                    'success'
                  )
                  this.getBrands()
                  this.updating = false
                } else {
                  Swal.fire(
                    'Error',
                    'Ocurrio un error al actualizar el registro ',
                    'error'
                  )
                }
              },
              error => {
                Swal.fire(
                  'Error',
                  'Ocurrio un error al actualizar el registro ',
                  'error'
                )
              }
            )

          }

        },
        error => {
          Swal.fire(
            'Error!',
            'El registro no se ha guardado.',
            'error'
          )
        }
      )
    } else {
      this._brandService.update(this.brandToUpdate).subscribe(
        response => {
          if (response.status == "success") {
            Swal.fire(
              'Muy bien',
              'se actualizó el registro ',
              'success'
            )
            this.getBrands()
            this.updating = false
          } else {
            Swal.fire(
              'Error',
              'Ocurrio un error al actualizar el registro ',
              'error'
            )
          }
        },
        error => {
          Swal.fire(
            'Error',
            'Ocurrio un error al actualizar el registro ',
            'error'
          )
        }
      )
    }





  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile);

  }

}

import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { global } from 'src/app/models/global';
import { SelectOption } from 'src/app/models/selectoption';
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
  public newOption: SelectOption
  public brandToUpdate: Brand
  public dropdownSettings: any
  public idBrandCategory: any
  selectedFile: File | any;
  constructor(
    private _brandService: BrandService,
    private _categoryService: CategoryService,
    private _userService: UserService
  ) {
    this.brand = new Brand('', '', '', '', 0);
    this.allempty = true;
    this.brandToUpdate = new Brand('', '', '', '', 0);
    this.newOption = new SelectOption(0, '')

  }

  ngOnInit(): void {
    this.getBrands()
    this.getCategories()


    this.dropdownSettings = {
      singleSelection: false,
      text: "Seleccionar Categorias",
      enableCheckAll: 'false',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      enableFilterSelectAll: false,
      classes: "form-select"
    };
  }


  getBrands() {
    return this._brandService.getAll().subscribe(
      response => {


        if (response.status == "success" && response.marks) {
          this.brands = response.marks
          console.log(response.marks);

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

          let firstPath = response.path

          let pathtoadd = firstPath.split("https://clips-vod-tcs.s3.amazonaws.com/")
          let definitelypath = global.toReplace + pathtoadd[1]


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
      text: 'Eliminaras el registro y no se podr?? recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'S??, la quiero eliminar!',
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
                'Error,No se elimin?? el registro ',
                'error'
              )
            }

          },
          error => {
            Swal.fire(
              'Cancelado',
              'Error,No se elimin?? el registro ',
              'error'
            )
            console.log(error);

          }
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se elimin?? el registro :)',
          'error'
        )
      }
    })


  }

  goUpdate(brand: any) {
    this.brandToUpdate = brand;


    this.updating = true
  }

  onUpdate(brand: any) {

    if (this.selectedFile != undefined && this.selectedFile != null) {
      let fd = new FormData();

      fd.append('thumbnail', this.selectedFile, this.selectedFile.name)

      this._userService.uploadImage(fd).subscribe(
        response => {
          if (response.path) {

            let firstPath = response.path

            let pathtoadd = firstPath.split("https://clips-vod-tcs.s3.amazonaws.com/")
            let definitelypath = global.toReplace + pathtoadd[1]


            this.brandToUpdate.image = definitelypath
            /* start update */

            this._brandService.update(this.brandToUpdate).subscribe(
              response => {
                if (response.status == "success") {
                  Swal.fire(
                    'Muy bien',
                    'se actualiz?? el registro ',
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
              'se actualiz?? el registro ',
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

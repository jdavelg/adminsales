import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  public categories: any
  public category: Category

  public status: any;

  constructor(
    private _categoryService: CategoryService
  ) {
    this.category = new Category('', '')
  }

  ngOnInit(): void {
    this.getCategories()
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

  onSubmit(category: any) {
    console.log(this.category);

    this._categoryService.save(this.category).subscribe(
      response => {
        if (response.status == "success") {
          this.status = "success"
          this.getCategories()

        }

      },
      error => {
        this.status = "error"
        console.log(error);

      }
    )
  }

  delete(id:any){
    Swal.fire({
      title: 'Estas segur@?',
      text: 'Eliminaras el registro y no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, la quiero eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryService.delete(id).subscribe(
          response=>{
if (response.status=="success") {
  Swal.fire(
    'eliminado!',
    'El registro se ha eliminado.',
    'success'
  )
  this.getCategories()
}else{
  Swal.fire(
    'Cancelado',
    'Error,No se eliminó el registro ',
    'error'
  )
}

          },
          error=>{
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

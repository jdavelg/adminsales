import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { global } from 'src/app/models/global';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public banner: Banner
  public banners: any
  public status: any
  selectedFile: File | any;
  constructor(
    private _bannerService: BannerService,
    private _userService: UserService
  ) {
    this.banner = new Banner('', '')
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this._bannerService.getBanners().subscribe(
      response => {

        if (response.status == "success") {
          this.banners = response.banners

        }
      },
      error => {
        console.log(error);

      }
    )
  }

  delete(banner: any) {

    Swal.fire({
      title: 'Estas segur@?',
      text: 'Eliminaras el registro y no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, la quiero eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._bannerService.delete(banner).subscribe(
          response => {
            if (response.status == "success") {
              this.getAll()
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

  onSubmit(banner: any) {


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

          this.banner.image = definitelypath
          /* start banner */
          this._bannerService.save(this.banner).subscribe(
            response => {
              if (response.status == "success") {
                this.status = 'success'
                this.getAll()
                banner.reset()
                Swal.fire(
                  'muy bien!',
                  'El banner se ha guardado!',
                  'success'
                )

              }
            },

            error => {
              console.log(error);
              this.status = "error"
              Swal.fire(
                'lo sentimos!',
                'Hubo un error al intentar guardar el banner!',
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

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
    console.log(this.selectedFile);

  }



}

import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';
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
  constructor(
    private _bannerService: BannerService
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

  save(banner: any) {
    this._bannerService.save(this.banner).subscribe(
      response => {
        if (response.status == "success") {
          this.status = 'success'
          this.getAll()
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

}

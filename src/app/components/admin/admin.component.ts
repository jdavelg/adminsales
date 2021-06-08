import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements DoCheck {

  public token: any;


  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.token = this._userService.getToken()
  }

  ngDoCheck(): void {
    this.token = this._userService.getToken()


  }


  logout() {
    Swal.fire({
      title: 'Estas segur@?',
      text: 'Cerrar sesion de administrador',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quiero cerrar sesion!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        Swal.fire(
          'Listo',
          'sesion de administrador cerrada',
          'success'
        )

        this._router.navigate(['/login'])

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'No se cerró la sesion :)',
          'error'
        )
      }
    })
  }

}

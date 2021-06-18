import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Counter } from 'src/app/models/counter';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  public counterTimer: any
  public counter: Counter
  public status: any
  public counterLength: any

  constructor(
    private _userService: UserService
  ) {
    this.counter = new Counter('', '')
  }

  ngOnInit(): void {
    this.getCounter()
  }

  getCounter() {



    this._userService.getCounter().subscribe(
      response => {
        if (response.status == "success") {
          this.counterTimer = response.counter
          this.counterLength = this.counterTimer.length
        }
      },
      error => {
        console.log(error);

      }
    )
  }

  onSubmit(form: any) {

    this.counter.end = moment(this.counter.end).format('lll')
    this.counter.start = moment(this.counter.start).format('lll')

    this._userService.saveCounter(this.counter).subscribe(
      response => {
        if (response.status == "success") {

          Swal.fire(
            'Exito!',
            'Se guardó el timer correctamente!',
            'success'
          )
          this.getCounter()
        }
      },
      error => {

        Swal.fire(
          'Error!',
          'Hubo un error al intentar guardar el timer!',
          'error'
        )

      }
    )
  }

  delete(id: any) {
    Swal.fire({
      title: 'Estas segur@?',
      text: 'Eliminaras el registro y no se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, la quiero eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteCounter(id).subscribe(
          response => {
            if (response.status == "success") {
              Swal.fire(
                'Exito!',
                'Se eliminó el timer correctamente!',
                'success'
              )
              this.getCounter()
            }

          },
          error => {
            Swal.fire(
              'Error!',
              'Hubo un error al intentar eliminar el timer!',
              'error'
            )
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

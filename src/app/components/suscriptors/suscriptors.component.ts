import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-suscriptors',
  templateUrl: './suscriptors.component.html',
  styleUrls: ['./suscriptors.component.css']
})
export class SuscriptorsComponent implements OnInit {
  public status: any
  public suscriptors: any
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this._userService.getSuscriptors().subscribe(
      response => {
        console.log(response);
        
        if (response.status=="success") {
          this.suscriptors = response.suscriptions
        }
      },
      error=>{
        console.log(error);
        
      }
    )

  }

  delete(){

  }
}

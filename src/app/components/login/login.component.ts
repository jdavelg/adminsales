import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
  
})
export class LoginComponent implements OnInit {
public user:User
public token:any
public alerta:boolean
  constructor(
    private _userService:UserService,
    private _router:Router
  ) { 
    this.user=new User('','',1),
    this.alerta=false
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
this._userService.login(this.user).subscribe(
  response=>{
if (response.token) {
  this.token= response.token
  localStorage.setItem('token', this.token);
  this._router.navigate(['/brand'])
}
  },
  error=>{
    console.log(error);
    this.alerta=true
    
  }
)

  }
}

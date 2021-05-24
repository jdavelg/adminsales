import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from '../models/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  login(user: User): Observable<any> {
    /* convertir objeto a json string */
    let params = JSON.stringify(user)
    /* definir cabeceras */

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    /* devolver peticion http */

    return this._http.post(global.url + 'user/login', params, { headers: headers })
  }

  getToken(){
    let token=sessionStorage.getItem('token')
    if (token!=undefined) {
      return token
    } else {
      return 'abecede'
    }
  
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, EmptyError, Observable } from 'rxjs';
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

  uploadImage(image: any): Observable<any> {

    console.log(image);

    /*   let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data') */


    return this._http.post(global.upload, image/* , { headers: headers } */)
  }

  getToken() {
    let token = localStorage.getItem('token')
    if (token != undefined) {
      return token
    } else {
      return '0'
    }

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

import { global } from '../models/global';
import { Category } from '../models/category';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: HttpClient,
    private _userservice: UserService
  ) { }

  getAll(): Observable<any> {
    return this._http.get(global.url + 'category/getcategories')
  }

  save(category: any): Observable<any> {
    let params = JSON.stringify(category)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userservice.getToken())

    return this._http.post(global.url + 'category/savecategory', params, { headers: headers })
  }

  delete(id: any): Observable<any> {
    let params = id
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userservice.getToken())

    return this._http.delete(global.url + 'category/deletecategory/' + params, { headers: headers })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

import { global } from '../models/global';
import { CategoryService } from './category.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private _categoryService:CategoryService,
    private _userservice:UserService,
    private _http:HttpClient

  ) { }


  save(brand: any): Observable<any> {
    let params = JSON.stringify(brand)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userservice.getToken())

    return this._http.post(global.url + 'mark/addmark', params, { headers: headers })
  }

  getAll():Observable<any>{
    return this._http.get(global.url + 'mark/getmarks')
  }
  delete(brand:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Authorization', this._userservice.getToken())


    return this._http.delete(global.url + 'mark/delete/'+brand,{headers:headers})

  }

}

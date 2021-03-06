import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

import { global } from '../models/global';
import { CategoryService } from './category.service';
import { UserService } from './user.service';
import { BrandService } from './brand.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private _brandService: BrandService
  ) { }

  getAll() {
    return this._brandService.getAll()

  }

  save(product: any): Observable<any> {

    var params = JSON.stringify(product)

    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())

    return this._http.post(global.url + 'product/saveproduct/' + product.brandId, params, { headers: headers })


  }

  update(product: any): Observable<any> {

    var params= JSON.stringify(product)
    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())


    return this._http.put(global.url + 'product/editproduct/'+product._id,params, { headers: headers })

  }

  remove(productId: any, brandId: any): Observable<any> {

    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())


    return this._http.delete(global.url + 'product/removeproduct/' + productId + '/' + brandId, { headers: headers })
  }

  getOne(productId: any, brandId: any): Observable<any> {

    var headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())


    return this._http.get(global.url + 'product/getproduct/' + productId + '/' + brandId, { headers: headers })
  }
}

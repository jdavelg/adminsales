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
    private _userService:UserService,
    private _http:HttpClient,
    private _brandService: BrandService
  ) { }

getAll(){
return this._brandService.getAll()

}

}

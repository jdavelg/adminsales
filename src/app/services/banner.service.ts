import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../models/banner';
import { global } from '../models/global';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class BannerService {
  public banner: Banner

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) {
    this.banner = new Banner('', '')
  }

  getBanners(): Observable<any> {
    return this._http.get(global.url + 'banner/getbanners')
  }


  save(banner: any): Observable<any> {

    let params = JSON.stringify(banner)
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())

    return this._http.post(global.url + 'banner/savebanner', params, { headers: headers })

  }

  delete(bannerId: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this._userService.getToken())


    return this._http.delete(global.url + 'banner/deletebanner/' + bannerId, { headers: headers })
  }

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class WebserviceService {

  constructor(private http: Http) { }

  private buildURL(page:string):string {
    //return 'https://gdchelperws.herokuapp.com/';
    return 'http://localhost:8180/GDCHelperWS/' + page;
  }

  get(page:string, params?: URLSearchParams):Observable<Response> {
    return this.http.get(this.buildURL(page),  { search: params });
  }

}

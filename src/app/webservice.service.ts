import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class WebserviceService {

  constructor(private http: Http) { }

  /**
   * Monta URL de comunicação com o WS
   * 
   * @param page 
   */
  private buildURL(page:string):string {
    return 'http://localhost:8180/GDCHelperWS/' + page;
  }

  /**
   * Busca informações de WS através do método HTTP Get
   * 
   * @param page 
   * @param params 
   */
  get(page:string, params?: URLSearchParams):Observable<Response> {
    return this.http.get(this.buildURL(page),  { search: params });
  }

  post(page:string, body:any):Observable<Response> {
    return this.http.post(this.buildURL(page), body);
  }

}

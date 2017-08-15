import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  public atendimentos;

  constructor(
    private http: Http
  ) {
  }

  ngOnInit() {
    this.http.get('https://gdchelperws.herokuapp.com/atendimentos').subscribe((res:Response) => {
      this.atendimentos = res.json();
    })
  }
}

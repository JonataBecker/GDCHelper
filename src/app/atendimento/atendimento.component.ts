import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  public atendimentos;

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
    this.http.get('https://gdchelperws.herokuapp.com/atendimentos').subscribe((res:Response) => {
      this.atendimentos = res.json();
    })
  }
}

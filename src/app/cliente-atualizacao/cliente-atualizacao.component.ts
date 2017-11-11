import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { WebserviceService } from 'app/webservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './cliente-atualizacao.component.html',
  styleUrls: ['./cliente-atualizacao.component.css']
})
export class ClienteAtualizacaoComponent implements OnInit {

  public atualizacoes;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.webservice.get(`cliente/${params['idCliente']}/atualizacoes`, null).subscribe((res) => {
        this.atualizacoes = res.json();
      });
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { WebserviceService } from 'app/webservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-atendimento',
  templateUrl: './cliente-atendimento.component.html',
  styleUrls: ['./cliente-atendimento.component.css']
})
export class ClienteAtendimentoComponent implements OnInit {

  public atendimentos;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let contato = '';
      if (params['codigoContato']) {
        contato = '/' + params['codigoContato'];
      }
      this.webservice.get(`cliente/${params['idCliente']}/atendimento${contato}`, null).subscribe((res) => {
        this.atendimentos = res.json();
      });
    });
  }

  openAtendimento(atendimento) {
    atendimento.click = !atendimento.click;

  }

}

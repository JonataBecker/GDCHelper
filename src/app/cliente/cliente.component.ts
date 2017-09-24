import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public cliente;
  public contatos;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    let idCliente;
    this.route.params.subscribe(params => {
      idCliente = params['idCliente'];
      this.webservice.get('cliente/' + params['idCliente'], null).subscribe((res) => {
        this.cliente = res.json();
      });
      const data = new  URLSearchParams();
      data.append('idCliente', idCliente);
      this.webservice.get('contatos', data).subscribe((res) => {
        this.contatos = res.json();
      });
    });
  }

}

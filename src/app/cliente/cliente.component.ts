import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public cliente;

  constructor(private webservice: WebserviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.webservice.get('cliente/' + params['idCliente'], null).subscribe((res) => {
        this.cliente = res.json();
      });
    });
  }

}

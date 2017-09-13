import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { WebserviceService } from 'app/webservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientes;
  public gdc:string;
  public loading:boolean;

  constructor(private webservice: WebserviceService) { }

  ngOnInit() {
    this.gdc = "";
  }

  filter() {
    this.clientes = null;
    this.load(this.gdc);
  }

  load(gdc:string) {
    this.loading = true;
    const data = new  URLSearchParams();
    data.append('gdc', gdc);
    this.webservice.get('cliente', data).subscribe((res) => {
      this.clientes = res.json();
      this.loading = false;
    });
  }

}

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

  constructor(private webservice: WebserviceService) { }

  ngOnInit() {
    this.gdc = "";
    this.load(this.gdc);
  }

  filter() {
    this.load(this.gdc);
  }

  load(gdc:string) {
    const data = new  URLSearchParams();
    data.append('gdc', gdc);
    this.webservice.get('cliente', data).subscribe((res) => {
      this.clientes = res.json();
      console.log(this.clientes);
    });
  }

}

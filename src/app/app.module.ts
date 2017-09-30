import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'angular-highcharts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { WebserviceService } from './webservice.service';
import { AdminLTE } from './AdminLTE';
import { AtendimentoDrilComponent } from './atendimento/atendimento-dril/atendimento-dril.component'
import { AtendimentoService } from './atendimento/atendimento.service';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuarioLogado } from './usuario/usuario-logado';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AtendimentoComponent,
    AtendimentoDrilComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [
    WebserviceService,
    AdminLTE,
    AtendimentoService,
    UsuarioLogado
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

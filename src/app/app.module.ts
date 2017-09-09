import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { WebserviceService } from './webservice.service';
import { AdminLTE } from './AdminLTE'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    AtendimentoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [WebserviceService, AdminLTE],
  bootstrap: [AppComponent]
})
export class AppModule { }

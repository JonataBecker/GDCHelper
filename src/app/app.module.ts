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
import { NegativePositiveProgressBarComponent } from './negative-positive-progress-bar/negative-positive-progress-bar.component';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuarioLogado } from './usuario/usuario-logado';
import { PesquisaPipe } from './pesquisa.pipe';
import { CarteiraComponent } from './carteira/carteira.component';
import { ConceitoBadgeComponent } from './conceito-badge/conceito-badge.component';
import { SortDirective } from './sort.directive';
import { FiltroCarteiraPipe } from './filtro-carteira.pipe';
import { FiltroContatoPipe } from './filtro-contato.pipe';
import { ClienteAtendimentoComponent } from './cliente-atendimento/cliente-atendimento.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AtendimentoComponent,
    AtendimentoDrilComponent,
    NegativePositiveProgressBarComponent,
    ClienteComponent,
    PesquisaPipe,
    CarteiraComponent,
    ConceitoBadgeComponent,
    SortDirective,
    FiltroCarteiraPipe,
    FiltroContatoPipe,
    ClienteAtendimentoComponent
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

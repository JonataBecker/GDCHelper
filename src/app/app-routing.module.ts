
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CarteiraComponent } from './carteira/carteira.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AtendimentoComponent } from './atendimento/atendimento.component';
import { AtendimentoDrilComponent } from './atendimento/atendimento-dril/atendimento-dril.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'carteira',
    component: CarteiraComponent,
  },  {
    path: 'atendimento',
    component: AtendimentoComponent,
  },
  {
    path: 'atendimento/:idCliente/:dataInicial/:dataFinal',
    component: AtendimentoDrilComponent,
  },
  {
    path: 'cliente/:idCliente',
    component: ClienteComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

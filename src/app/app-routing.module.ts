
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
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
    path: 'atendimento',
    component: AtendimentoComponent,
  },
  {
    path: 'atendimento/:idCliente/:dataInicial/:dataFinal',
    component: AtendimentoDrilComponent,
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

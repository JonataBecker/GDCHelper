import { Injectable } from '@angular/core';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioLogado {

  login(usuario:Usuario) {
    localStorage.setItem('usuario', usuario.getUsuario());
  }

  getUsuarioLogado() {
    localStorage.getItem('usuario');
  }

}

import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsuarioLogado {

  private subject = new Subject<any>();

  login(usuario:Usuario) {
    localStorage.setItem('usuario', usuario.getUsuario());
    this.subject.next(usuario.getUsuario());
  }

  getUsuarioLogado() {
    return localStorage.getItem('usuario');
  }

  getUsuario(): Observable<any> {
      setTimeout(() => {
          this.subject.next(this.getUsuarioLogado());
      });
      return this.subject.asObservable();
  }

}

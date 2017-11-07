import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UsuarioLogado {

  private subject = new Subject<any>();

  /**
   * Executa o login
   * 
   * @param usuario 
   */
  login(usuario:Usuario) {
    localStorage.setItem('usuario', usuario.getUsuario());
    this.subject.next(usuario.getUsuario());
  }

  /**
   * Retorna o usuário logado
   */
  getUsuarioLogado() {
    return localStorage.getItem('usuario');
  }

  /**
   * Retorna o usuário
   */
  getUsuario(): Observable<any> {
      setTimeout(() => {
          this.subject.next(this.getUsuarioLogado());
      });
      return this.subject.asObservable();
  }

}

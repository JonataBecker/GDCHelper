export class Usuario {

  constructor(private usuario:string, private nome: string) {
  }

  /**
   * Retorna o usuário
   */
  getUsuario() {
    return this.usuario;
  }

  /**
   * Retorna o nome do usuário
   */
  getNome() {
    return this.nome;
  }

}

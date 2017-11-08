export class Usuario {

  constructor(private usuario:string, private nome: string, private foto:string) {
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

  /**
   * Retorna a foto do usuários
   */
  getFoto() {
    return this.foto;
  }

}

export default class Cliente {
  constructor(nome, idade, sexo, cpf, endereco) {
    this.nome = nome;
    this.idade = idade;
    this.sexo = sexo;
    this.cpf = cpf;
    this.endereco = endereco;
  }

  maioridade() {
    return this.idade >= 18 ? true : false;
  }
}

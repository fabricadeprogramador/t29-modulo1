class GerenciadorNomeSecreto {
  constructor(segredo, tentativas) {
    this.nomeSecreto = segredo;
    this.tentativas = tentativas;
    this.numTentativas = tentativas;
    this.nomesTentados = [];
  }

  verificarNome() {
    let nome = document.getElementById("nome").value;

    if (nome == "") {
      alert("Preencha o campo nome!");
    } else {
      if (this.tentativas > 0) {
        if (nome == this.nomeSecreto) {
          alert("Parabéns, você encontrou o nome secreto! =)");
          this.reset();
        } else {
          if (this.nomesTentados.includes(nome)) {
            alert("Este nome já foi tentado!");
          } else {
            this.tentativas--;
            this.nomesTentados.push(nome);
            document.getElementById("resultado").innerText = this.nomesTentados;
          }
        }
      } else {
        alert("Você infelizmente não possui mais tentativas!");
        this.reset();
      }
    }
    this.limpar();
  }

  limpar() {
    document.getElementById("nome").value = "";
  }

  reset() {
    this.nomesTentados = [];
    this.tentativas = this.numTentativas;
    document.getElementById("resultado").innerText = "";
  }
}
let controller = new GerenciadorNomeSecreto("Jão", 10);

class EstacionamentoController {
  constructor() {
    this.carros = [];
    this.geradorId = 0;
    this.carroEdicao = null;
  }

  salvar() {
    let carroAtual = this.lerDados();

    if (this.validar(carroAtual)) {
      if (this.carroEdicao == null) {
        this.adicionar(carroAtual);
      } else {
        this.salvarEdicao(carroAtual);
      }

      this.cancelar();
      this.gerarTabela();
    }
  }

  lerDados() {
    let carroNovo = {};

    carroNovo.nome = document.getElementById("nome").value;
    carroNovo.marca = document.getElementById("marca").value;
    carroNovo.ano = document.getElementById("ano").value;

    return carroNovo;
  }

  adicionar(carro) {
    carro.id = this.geradorId;
    this.geradorId++;
    carro.ano = parseInt(carro.ano);

    this.carros.push(carro);
  }

  editar(id, nome, marca, ano) {
    this.carroEdicao = id;
    document.getElementById("nome").value = nome;
    document.getElementById("marca").value = marca;
    document.getElementById("ano").value = ano;
  }

  salvarEdicao(carro) {
    let i = 0;
    let achou = false;
    while (i < this.carros.length && !achou) {
      if (this.carros[i].id == this.carroEdicao) {
        this.carros[i].nome = carro.nome;
        this.carros[i].marca = carro.marca;
        this.carros[i].ano = carro.ano;
        achou = true;
      }
      i++;
    }

    if (!achou) {
      alert("Carro não encontrado!");
    }

    this.gerarTabela();
  }

  remover(id) {
    let i = 0;
    let achou = false;
    while (i < this.carros.length && !achou) {
      if (this.carros[i].id == id) {
        if (confirm("Tem certeza que deseja remover este carro?")) {
          this.carros.splice(i, 1);
        }
        achou = true;
      }
      i++;
    }

    if (!achou) {
      alert("Carro não encontrado!");
    }

    this.gerarTabela();
  }

  validar(carro) {
    let mensagem = "";

    if (carro.nome == "") {
      mensagem += "Preencha o campo nome!\n";
    }

    if (carro.marca == "") {
      mensagem += "Preencha o campo marca!\n";
    }

    if (carro.ano == "") {
      mensagem += "Preencha o campo ano!\n";
    }

    if (mensagem != "") {
      alert(mensagem);
      return false;
    }

    return true;
  }
  gerarTabela() {
    let tabela = document.getElementById("tabela-corpo");
    tabela.innerText = "";

    for (let i = 0; i < this.carros.length; i++) {
      let linha = tabela.insertRow();
      let colunaNome = linha.insertCell();
      let colunaMarca = linha.insertCell();
      let colunaAno = linha.insertCell();
      let colunaEditar = linha.insertCell();
      let colunaRemover = linha.insertCell();

      colunaNome.innerText = this.carros[i].nome;
      colunaMarca.innerText = this.carros[i].marca;
      colunaAno.innerText = this.carros[i].ano;

      let imagemEditar = document.createElement("img");
      let imagemRemover = document.createElement("img");

      imagemEditar.src = "img/editar.svg";
      imagemRemover.src = "img/deletar.svg";

      imagemEditar.setAttribute(
        "onclick",
        `controller.editar(${this.carros[i].id}, '${this.carros[i].nome}', '${this.carros[i].marca}', '${this.carros[i].ano}')`
      );
      imagemRemover.setAttribute(
        "onclick",
        `controller.remover(${this.carros[i].id})`
      );

      colunaEditar.appendChild(imagemEditar);
      colunaRemover.appendChild(imagemRemover);
    }
  }

  cancelar() {
    document.getElementById("nome").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("ano").value = "";

    this.carroEdicao = null;
  }

  resultado() {
    let carroMaisNovo = 0;
    let carroMaisVelho = 0;
    let somaDosAnos = 0;

    for (let i = 0; i < this.carros.length; i++) {
      //Comparar o mais novo
      if (this.carros[i].ano > this.carros[carroMaisNovo].ano) {
        carroMaisNovo = i;
      }
      //Comparar o mais velho
      if (this.carros[i].ano < this.carros[carroMaisVelho].ano) {
        carroMaisVelho = i;
      }
      //Somar o ano
      somaDosAnos += this.carros[i].ano;
    }

    document.getElementById(
      "maisNovo"
    ).innerText = `Nome: ${this.carros[carroMaisNovo].nome} - Marca: ${this.carros[carroMaisNovo].marca} - Nome: ${this.carros[carroMaisNovo].ano}`;

    document.getElementById(
      "maisVelho"
    ).innerText = `Nome: ${this.carros[carroMaisVelho].nome} - Marca: ${this.carros[carroMaisVelho].marca} - Nome: ${this.carros[carroMaisVelho].ano}`;

    document.getElementById("media").innerText =
      somaDosAnos / this.carros.length;
  }
}

let controller = new EstacionamentoController();

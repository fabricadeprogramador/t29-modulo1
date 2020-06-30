class ContaController {
  constructor() {
    this.contas = [];
    this.empresas = [];
    this.geradorId = 0;
    this.idEdicao = null;
  }

  inicializarLocalStorage() {
    if (typeof Storage !== "undefined") {
      let empresasLSStr = localStorage.getItem("empresas");
      let contasLSStr = localStorage.getItem("contas");
      let geradorIdLS = localStorage.getItem("geradorIdContas");

      if (empresasLSStr == null) {
        localStorage.setItem("empresas", JSON.stringify(this.empresas));
      } else {
        this.empresas = JSON.parse(localStorage.getItem("empresas"));
        this.carregarEmpresas();
      }

      if (contasLSStr == null) {
        localStorage.setItem("contas", JSON.stringify(this.contas));
      } else {
        this.contas = JSON.parse(localStorage.getItem("contas"));
      }

      if (geradorIdLS == null) {
        localStorage.setItem("geradorIdContas", this.geradorId.toString());
      } else {
        this.geradorId = parseInt(localStorage.getItem("geradorIdContas"));
      }

      this.carregarTabela();
    } else {
      alert("Navegador não suportado!");
    }
  }

  carregarEmpresas() {
    let select = document.getElementById("receptor");

    for (let i = 0; i < this.empresas.length; i++) {
      let option = document.createElement("option");
      option.value = JSON.stringify(this.empresas[i]);
      option.innerText = this.empresas[i].nome;

      select.appendChild(option);
    }
  }

  sincronizar() {
    localStorage.setItem("contas", JSON.stringify(this.contas));
    localStorage.setItem("geradorIdContas", this.geradorId.toString());
  }

  lerDados() {
    let conta = {};

    conta.valor = document.getElementById("valor").value;
    conta.tipo = document.getElementById("tipo").value;
    conta.paga = document.getElementById("paga").checked;
    conta.receptor = document.getElementById("receptor").value;

    return conta;
  }

  validar(conta) {
    let mensagens = "";

    if (conta.valor == "") {
      mensagens += "Preencha o campo de valor! \n";
    }

    if (mensagens != "") {
      alert(mensagens);
      return false;
    }

    return true;
  }

  salvar() {
    let conta = this.lerDados();

    if (this.validar(conta)) {
      if (this.idEdicao == null) {
        this.adicionar(conta);
      } else {
        this.salvarEdicao(conta);
      }

      this.sincronizar();
      this.limpar();
      this.carregarTabela();
    }
  }

  adicionar(conta) {
    conta.id = this.geradorId;
    this.geradorId++;

    this.contas.push(conta);
  }

  salvarEdicao(conta) {
    let i = 0;
    let achou = false;

    while (!achou && i < this.contas.length) {
      if (this.idEdicao == this.contas[i].id) {
        achou = true;
        this.contas[i].valor = conta.valor;
        this.contas[i].tipo = conta.tipo;
        this.contas[i].paga = conta.paga;
        this.contas[i].receptor = conta.receptor;
      }
      i++;
    }
  }

  carregarTabela() {
    let tabela = document.getElementById("tabela");

    tabela.innerHTML = "";

    for (let i = 0; i < this.contas.length; i++) {
      let linha = tabela.insertRow();

      let colunaValor = linha.insertCell();
      let colunaTipo = linha.insertCell();
      let colunaPaga = linha.insertCell();
      let colunaReceptor = linha.insertCell();
      let colunaEditar = linha.insertCell();
      let colunaExcluir = linha.insertCell();

      colunaValor.innerText = this.contas[i].valor;
      colunaTipo.innerText = this.contas[i].tipo;
      this.contas[i].paga
        ? (colunaPaga.innerText = "Sim")
        : (colunaPaga.innerText = "Não");
      colunaReceptor.innerText = this.contas[i].receptor.nome;

      let imgEditar = document.createElement("img");
      let imgExcluir = document.createElement("img");

      imgEditar.src = "img/editar.svg";
      imgExcluir.src = "img/deletar.svg";

      imgEditar.setAttribute(
        "onclick",
        `contaController.editar("${this.contas[i].id}", "${this.contas[i].valor}", "${this.contas[i].tipo}", "${this.contas[i].receptor}", "${this.empresas[i].paga}")`
      );
      imgExluir.setAttribute(
        "onclick",
        `contaController.excluir("${this.contas[i].id}")`
      );

      colunaEditar.appendChild(imgEditar);
      colunaExcluir.appendChild(imgExcluir);
    }
  }

  editar(id, nome, endereco, razaoSocial, cnpj) {
    this.idEdicao = id;

    document.getElementById("nome").value = nome;
    document.getElementById("endereco").value = endereco;
    document.getElementById("cnpj").value = cnpj;
    document.getElementById("razaoSocial").value = razaoSocial;
  }

  mudarStatus(id) {
    if (confirm("Tem certeza que deseja mudar o status desta empresa?")) {
      let i = 0;
      let achou = false;

      while (!achou && i < this.empresas.length) {
        if (id == this.empresas[i].id) {
          achou = true;
          this.empresas[i].ativo = !this.empresas[i].ativo;
        }
        i++;
      }

      this.sincronizar();
      this.carregarTabela();
    }
  }

  limpar() {
    document.getElementById("nome").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("cnpj").value = "";
    document.getElementById("razaoSocial").value = "";

    this.idEdicao = null;
  }
}

let contaController = new ContaController();
